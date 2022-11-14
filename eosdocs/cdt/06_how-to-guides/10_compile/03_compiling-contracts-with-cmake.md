---
tags:
  - AntelopeIO/cdt/tree/v3.0.1/docs/06_how-to-guides/10_compile/03_compiling-contracts-with-cmake.md
  - AntelopeIO/cdt
  - v3.0.1
title: How to compile a smart contract with CMake
---

## Overview

This guide provides instructions to compile a smart contract with CMake.

## Before you begin

* You have the source of the contract saved in a local folder, e.g. `./examples/hello/`

## Procedure

Follow the following steps to compile your contract.

1. Navigate to the hello folder in examples (./examples/hello), you should then see the ./src/hello.cpp file
2. Run following commands:

    ```sh
    mkdir build
    cd build
    cmake ..
    make
    ```

3. Verify the following two files were generated:

* the compiled binary wasm: `hello.wasm`,
* and the generated ABI file: `hello.abi`.

## Summary

In conclusion, the above instructions show how to compile a smart contract with CMake.
