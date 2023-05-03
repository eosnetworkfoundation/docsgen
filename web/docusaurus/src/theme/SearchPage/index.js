/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState, useReducer, useRef } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Select from 'react-select'
import algoliaSearch from 'algoliasearch/lite';
import algoliaSearchHelper from 'algoliasearch-helper';
import Head from '@docusaurus/Head';
import IconHome from '@theme/Icon/Home';
import Link from '@docusaurus/Link';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import {
  HtmlClassNameProvider,
  usePluralForm,
  isRegexpStringMatch,
  useEvent,
  useSearchQueryString,
} from '@docusaurus/theme-common';
import {useTitleFormatter} from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const PageNumber = ({ pageNumber, isActive, onClick }) => (
  <button
    type="button"
    className={clsx(styles.pageNumber, {
      [styles.pageNumberActive]: isActive,
    })}
    onClick={onClick}>
    {pageNumber}
  </button>
);

const SearchPagination = ({ searchResultState, onPageClick }) => {
  const { totalPages, lastPage } = searchResultState;
  const [pages, setPages] = useState([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [shownPages, setShownPages] = useState(totalPages === 1 ? [0] : totalPages === 2 ? [0, 1] : [0, 1, 2]);

  useEffect(() => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    setPages(pages);
    setIsFirstPage(lastPage === 0);
    setIsLastPage(lastPage === totalPages - 1);
  }, [totalPages, lastPage]);

  const handlePageClick = (page) => {
    if (page === lastPage) {
      return;
    }

    const prevPage = page - 1;
    const nextPage = page + 1;

    if (page === 1) {
      setShownPages([0, 1, 2]);
    }

    if (page > 1 && page < totalPages - 1) {
      setShownPages([prevPage, page, nextPage]);
    }

    onPageClick(page);
    window.scrollTo({
      top: 0,
    });
  }

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={clsx(styles.prevPage, styles.pageNumber, {
          [styles.pageNumberDisabled]: isFirstPage,
        })}
        disabled={isFirstPage}
        onClick={() => handlePageClick(lastPage - 1)}
      />
      {shownPages.map((pageNumber) => (
        <PageNumber
          key={pageNumber}
          pageNumber={pageNumber + 1}
          isActive={pageNumber === lastPage}
          onClick={() => handlePageClick(pageNumber)}
        />
      ))}
      <button
        type="button"
        className={clsx(styles.nextPage, styles.pageNumber, {
          [styles.pageNumberDisabled]: isLastPage,
        })}
        disabled={isLastPage}
        onClick={() => handlePageClick(lastPage + 1)} />
    </div>
  );
};

// Very simple pluralization: probably good enough for now
function useDocumentsFoundPlural() {
  const { selectMessage } = usePluralForm();
  return (count) =>
    selectMessage(
      count,
      translate(
        {
          id: 'theme.SearchPage.documentsFound.plurals',
          description:
            'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One document found|{count} documents found',
        },
        { count },
      ),
    );
}
function useDocsSearchVersionsHelpers() {
  const allDocsData = useAllDocsData();
  // State of the version select menus / algolia facet filters
  // docsPluginId -> versionName map
  const [searchVersions, setSearchVersions] = useState(() =>
    Object.entries(allDocsData).reduce(
      (acc, [pluginId, pluginData]) => ({
        ...acc,
        [pluginId]: pluginData.versions[0].name,
      }),
      {},
    ),
  );
  // Set the value of a single select menu
  const setSearchVersion = (pluginId, searchVersion) =>
    setSearchVersions((s) => ({ ...s, [pluginId]: searchVersion }));
  const versioningEnabled = Object.values(allDocsData).some(
    (docsData) => docsData.versions.length > 1,
  );
  return {
    allDocsData,
    versioningEnabled,
    searchVersions,
    setSearchVersion,
  };
}
// We want to display one select per versioned docs plugin instance
function SearchVersionSelectList({ docsSearchVersionsHelpers, className }) {
  const versionedPluginEntries = Object.entries(
    docsSearchVersionsHelpers.allDocsData,
  )
    // Do not show a version select for unversioned docs plugin instances
    .filter(([, docsData]) => docsData.versions.length > 1);

  const labelPrefix = versionedPluginEntries.length > 1 ? `${pluginId}: ` : '';
  return (
    <>
      {versionedPluginEntries.map(([pluginId, docsData]) => {
        const currentVersion = docsData.versions.filter(ver => ver.name === docsSearchVersionsHelpers.searchVersions[pluginId]);

        return (
          <Select
            defaultValue={currentVersion}
            key={pluginId}
            onChange={(e) => {
              docsSearchVersionsHelpers.setSearchVersion(
                pluginId,
                e.value,
              )
            }}
            className={className}
            options={docsData.versions.map((version) => ({
              value: version.name,
              label: `${labelPrefix}${version.label}`,
            }))}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderRadius: '6px',
                height: '60px',
                width: 300,
                margin: 'auto',
                outline: 'none',
                padding: '10px 24px'
              }),
              indicatorSeparator: (provided, state) => ({
                ...provided,
                display: 'none'
              }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: '#000000',
                padding: '0px 10px'
              }),
              menu: (provided, state) => ({
                ...provided,
                borderRadius: '6px',
                outline: 'none',
              }),
              menuList: (provided, state) => ({
                ...provided,
                padding: '0px'
              }),
            }}

          />
        )
      })}
    </>
  );
}
function SearchPageContent() {
  const {
    siteConfig: { themeConfig },
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const {
    algolia: { appId, apiKey, indexName, externalUrlRegex },
  } = themeConfig;
  const documentsFoundPlural = useDocumentsFoundPlural();
  const docsSearchVersionsHelpers = useDocsSearchVersionsHelpers();
  const [searchQuery, setSearchQuery] = useSearchQueryString();
  const initialSearchResultState = {
    items: [],
    query: null,
    totalResults: null,
    totalPages: null,
    lastPage: null,
    hasMore: null,
    loading: null,
  };
  const [searchResultState, searchResultStateDispatcher] = useReducer(
    (prevState, data) => {
      switch (data.type) {
        case 'reset': {
          return initialSearchResultState;
        }
        case 'loading': {
          return { ...prevState, loading: true };
        }
        case 'update': {
          if (searchQuery !== data.value.query) {
            return prevState;
          }
          return {
            ...data.value,
            items: data.value.items
          };
        }
        case 'advance': {
          const hasMore = prevState.totalPages > prevState.lastPage + 1;
          return {
            ...prevState,
            lastPage: hasMore ? prevState.lastPage + 1 : prevState.lastPage,
            hasMore,
          };
        }
        default:
          return prevState;
      }
    },
    initialSearchResultState,
  );
  const algoliaClient = algoliaSearch(appId, apiKey);
  const algoliaHelper = algoliaSearchHelper(algoliaClient, indexName, {
    hitsPerPage: 15,
    advancedSyntax: true,
    disjunctiveFacets: ['language', 'docusaurus_tag'],
  });
  algoliaHelper.on(
    'result',
    ({ results: { query, hits, page, nbHits, nbPages } }) => {
      if (query === '' || !Array.isArray(hits)) {
        searchResultStateDispatcher({ type: 'reset' });
        return;
      }
      const sanitizeValue = (value) =>
        value.replace(
          /algolia-docsearch-suggestion--highlight/g,
          'search-result-match',
        );
      const items = hits.map(
        ({
          url,
          _highlightResult: { hierarchy },
          _snippetResult: snippet = {},
        }) => {
          const parsedURL = new URL(url);
          const titles = Object.keys(hierarchy).map((key) =>
            sanitizeValue(hierarchy[key].value),
          );

          return {
            title: titles.pop(),
            url: isRegexpStringMatch(externalUrlRegex, parsedURL.href)
              ? parsedURL.href
              : parsedURL.pathname + parsedURL.hash,
            summary: snippet.content
              ? `${sanitizeValue(snippet.content.value)}...`
              : '',
            breadcrumbs: titles,
          };
        },
      );

      searchResultStateDispatcher({
        type: 'update',
        value: {
          items,
          query,
          totalResults: nbHits,
          totalPages: nbPages,
          lastPage: page,
          hasMore: nbPages > page + 1,
          loading: false,
        },
      });
    },
  );
  // INFINITE SCROLL
  // const [loaderRef, setLoaderRef] = useState(null);
  // const prevY = useRef(0);
  // const observer = useRef(
  //   ExecutionEnvironment.canUseIntersectionObserver &&
  //     new IntersectionObserver(
  //       (entries) => {
  //         const {
  //           isIntersecting,
  //           boundingClientRect: {y: currentY},
  //         } = entries[0];
  //         if (isIntersecting && prevY.current > currentY) {
  //           searchResultStateDispatcher({type: 'advance'});
  //         }
  //         prevY.current = currentY;
  //       },
  //       {threshold: 1},
  //     ),
  // );
  const getTitle = () =>
    searchQuery
      ? translate(
        {
          id: 'theme.SearchPage.existingResultsTitle',
          message: 'Search results for "{query}"',
          description: 'The search page title for non-empty query',
        },
        {
          query: searchQuery,
        },
      )
      : translate({
        id: 'theme.SearchPage.emptyResultsTitle',
        message: 'Search the documentation',
        description: 'The search page title for empty query',
      });
  const makeSearch = useEvent((page = 0) => {
    algoliaHelper.addDisjunctiveFacetRefinement('docusaurus_tag', 'default');
    algoliaHelper.addDisjunctiveFacetRefinement('language', currentLocale);
    Object.entries(docsSearchVersionsHelpers.searchVersions).forEach(
      ([pluginId, searchVersion]) => {
        algoliaHelper.addDisjunctiveFacetRefinement(
          'docusaurus_tag',
          `docs-${pluginId}-${searchVersion}`,
        );
      },
    );
    algoliaHelper.setQuery(searchQuery).setPage(page).search();
  });
  // INFINITE SCROLL
  // useEffect(() => {
  //   if (!loaderRef) {
  //     return undefined;
  //   }
  //   const currentObserver = observer.current;
  //   if (currentObserver) {
  //     currentObserver.observe(loaderRef);
  //     return () => currentObserver.unobserve(loaderRef);
  //   }
  //   return () => true;
  // }, [loaderRef]);
  useEffect(() => {
    searchResultStateDispatcher({ type: 'reset' });
    if (searchQuery) {
      searchResultStateDispatcher({ type: 'loading' });
      setTimeout(() => {
        makeSearch();
      }, 300);
    }
  }, [searchQuery, docsSearchVersionsHelpers.searchVersions, makeSearch]);
  useEffect(() => {
    if (!searchResultState.lastPage || searchResultState.lastPage === 0) {
      return;
    }
    makeSearch(searchResultState.lastPage);
  }, [makeSearch, searchResultState.lastPage]);

  const onPageClick = (page) => {
    makeSearch(page);
  };

  const homeHref = useBaseUrl('/');

  return (
    <Layout>
      <Head>
        <title>{useTitleFormatter(getTitle())}</title>
        {/*
         We should not index search pages
          See https://github.com/facebook/docusaurus/pull/3233
        */}
        <meta property="robots" content="noindex, follow" />
      </Head>

      <div className={styles.searchPage}>

        <nav
          className={clsx(
            ThemeClassNames.docs.docBreadcrumbs,
            styles.breadcrumbsContainer,
          )}
          aria-label={translate({
            id: 'theme.docs.breadcrumbs.navAriaLabel',
            message: 'Breadcrumbs',
            description: 'The ARIA label for the breadcrumbs',
          })}>
          <ul
            className="breadcrumbs"
            itemScope
            itemType="https://schema.org/BreadcrumbList">
            <li className="breadcrumbs__item">
              <Link
                aria-label={translate({
                  id: 'theme.docs.breadcrumbs.home',
                  message: 'Home page',
                  description: 'The ARIA label for the home page in the breadcrumbs',
                })}
                className={clsx('breadcrumbs__link', styles.breadcrumbsItemLink)}
                href={homeHref}>
                <IconHome className={styles.breadcrumbHomeIcon} />
              </Link>
            </li>
            <li
              className={clsx('breadcrumbs__item', 'breadcrumbs__item--active')}>
              <a className={clsx('breadcrumbs__link', styles.breadcrumbsItemLink)}>
                <span
                  itemProp="name"
                  className={clsx('breadcrumb__link', styles.breadcrumbsItemLink)}>
                  Search results
                </span>
              </a>
            </li>
          </ul>
        </nav>


        <div className={styles.containerSearchPage}>
          {/* <div className={styles.searchSidebar}>

        </div> */}

          <div className={styles.resultsContainer}>
            <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="search"
                name="q"
                className={styles.searchInput}
                placeholder={translate({
                  id: 'theme.SearchPage.inputPlaceholder',
                  message: 'Type your search here',
                  description: 'The placeholder for search page input',
                })}
                aria-label={translate({
                  id: 'theme.SearchPage.inputLabel',
                  message: 'Search',
                  description: 'The ARIA label for search page input',
                })}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                autoComplete="off"
                autoFocus
              />
            </form>

            {docsSearchVersionsHelpers.versioningEnabled && (
              <SearchVersionSelectList
                className={styles.searchVersionInputMobile}
                docsSearchVersionsHelpers={docsSearchVersionsHelpers}
              />
            )}

            <h1>{getTitle()}</h1>

            <div>
              {!!searchResultState.totalResults &&
                documentsFoundPlural(searchResultState.totalResults)}
            </div>

            {searchResultState.items.length > 0 ? (
              <main>
                {searchResultState.items.map(
                  ({ title, url, summary, breadcrumbs }, i) => (
                    <article key={i} className={styles.searchResultItem}>
                      <h2 className={styles.searchResultItemHeading}>
                        <Link to={url} dangerouslySetInnerHTML={{ __html: title }} />
                      </h2>

                      {summary && (
                        <p
                          className={styles.searchResultItemSummary}
                          // Developer provided the HTML, so assume it's safe.
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{ __html: summary }}
                        />
                      )}
                    </article>
                  ),
                )}
              </main>
            ) : (
              [
                !!searchResultState.loading && (
                  <div key="spinner" className={styles.loadingSpinner} />
                ),
              ]
            )}

            {searchResultState.items.length > 0 && <SearchPagination searchResultState={searchResultState} onPageClick={onPageClick} />}
            {!searchResultState.items.lentgh < 1 && searchQuery && !searchResultState.loading && (
                <p key="no-results">
                <Translate
                  id="theme.SearchPage.noResultsText"
                  description="The paragraph for empty search result">
                  No results were found
                </Translate>
              </p>
            )}
            {!searchQuery && (
              <p key="please-search">
                <Translate
                  id="theme.SearchPage.pleaseSearchText"
                  description="No search query provided">
                  Please enter a search query
                </Translate>
              </p>
            )}

          </div>
          <div className={styles.desktopVersionContainer}>
            {docsSearchVersionsHelpers.versioningEnabled && (
              <SearchVersionSelectList
                className={styles.searchVersionInput}
                docsSearchVersionsHelpers={docsSearchVersionsHelpers}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default function SearchPage() {
  return (
    <HtmlClassNameProvider className="search-page-wrapper">
      <SearchPageContent />
    </HtmlClassNameProvider>
  );
}
