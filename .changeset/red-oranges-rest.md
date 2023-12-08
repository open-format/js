---
"@openformat/sdk": patch
---

This pull request introduces a new RequestFee function has been implemented into the BaseContract, which is now invoked during contract creation and reward distribution functions, aligning transaction fee handling with user activities. This is the first test to us testing our token model.

- [Error types](https://github.com/open-format/js/commit/160ae695364e6dbb635a0bf79d4695c4c703cca2)
- [RequestFee functionality to BaseContract](https://github.com/open-format/js/commit/4c11c0efefeb05d7669227d61d421f9e00da1e0b)
- [call requestFee in creation and reward functions](https://github.com/open-format/js/commit/6dfbe8971259bbfbe1006168274e4ffd362923eb)
-

- [jest globalSetup script is now .ts](https://github.com/open-format/js/commit/b650c6448be738ac73e0c685b76ff641f94a5a9f)
- [update address constants](https://github.com/open-format/js/commit/5ea3dcfdff81ee9e300bbf3b867ce5a493023f76)
- [Update tests](https://github.com/open-format/js/commit/95dce2ab6e9a52b53ccf435713899a80ca4adcc6)
