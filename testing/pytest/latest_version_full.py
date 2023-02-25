import sys
import pytest

sys.path.append('../../scripts')
from latest_release import *

def test_leap():
    result = main(['-oantelopeIO', '-rleap', '-d../../working'])
    assert(result[1:])
    version_info = result[1:].split('.')
    assert(version_info[0] > "2")
    print(f'Leap Version Tag {result}')

def test_cdt():
    result = main(['-oantelopeIO', '-rcdt', '-d../../working'])
    assert(result[1:])
    version_info = result[1:].split('.')
    assert(version_info[0] > "2")
    print(f'CDT Version Tag {result}')

def test_DUNE():
    result = main(['-oantelopeIO', '-rDUNE', '-d../../working'])
    assert(result[1:])
    version_info = result[1:].split('.')
    assert(version_info[0] >= "1")
    print(f'DUNE Version Tag {result}')

def test_docs():
    result = main(['-oeosnetworkfoundation', '-rdocs', '-d../../working'])
    assert(result is None)
    print(f'Docs Version Tag {result}')

def test_sys_contracts():
    result = main(['-oeosnetworkfoundation', '-reos-system-contracts', '-d../../working'])
    assert(result[1:])
    version_info = result[1:].split('.')
    assert(version_info[0] > "2")
    print(f'EOS System Contracts Version Tag {result}')

def test_eosjs():
    result = main(['-oeosnetworkfoundation', '-rmandel-eosjs', '-d../../working'])
    assert(result is None)
    print(f'eosjs Version Tag {result}')

def test_java():
    result = main(['-oeosnetworkfoundation', '-rmandel-java', '-d../../working'])
    assert(result[1:])
    version_info = result[1:].split('.')
    assert(version_info[0] == "0")
    print(f'java Version Tag {result}')

def test_swift():
    result = main(['-oeosnetworkfoundation', '-rmandel-swift', '-d../../working'])
    assert(result[1:])
    version_info = result[1:].split('.')
    assert(version_info[0] == "0")
    print(f'swift Version Tag {result}')
