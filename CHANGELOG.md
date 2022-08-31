# Changelog

All notable changes to this project from its first public release (version 0.4.0) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) since version 0.4.0.

## 0.4.3 (2022-08-31)

### Changed

-   Uninstall next-pwa and create service worker from scratch which will hopefully end the PWA installation problem.

## 0.4.2 (2022-08-30)

### Changed

-   Configuration files and netlify-specific files that caused the app to not build or fail installing as a PWA.

## 0.4.1 (2022-08-29)

### Changed

-   Links to GitHub that pointed to github.com instead of the project's URL.

### Fixed

-   Fix bug that caused the app to not display settings page text properly.

## 0.4.0 (2022-08-29)

### Added

-   Ability to capture a photo directly from the app.
-   Ability to save captured photo as PNG, JPG or WebP, also being able to specify the quality parameter for JPG and WebP.
-   Ability to downscale the captured photo.
-   Ability to open multiple photos at once and save them as separated projects.
-   Ability to save the opened photos in the same way as the captured photos.
-   Feature to save the projects in indexedDB and be able to see them at any time.
-   Legal pages (privacy policy, terms of use etc.).
-   English and romanian translations.
