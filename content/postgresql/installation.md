## Chapter 17. Installation from Source Code

**Table of Contents**

  * *   [17.1. Requirements](install-requirements.html)
  * [17.2. Getting the Source](install-getsource.html)
  * [17.3. Building and Installation with Autoconf and Make](install-make.html)

    

  * *   [17.3.1. Short Version](install-make.html#INSTALL-SHORT-MAKE)
    * [17.3.2. Installation Procedure](install-make.html#INSTALL-PROCEDURE-MAKE)
    * [17.3.3. `configure` Options](install-make.html#CONFIGURE-OPTIONS)
    * [17.3.4. `configure` Environment Variables](install-make.html#CONFIGURE-ENVVARS)

* [17.4. Building and Installation with Meson](install-meson.html)

  * *   [17.4.1. Short Version](install-meson.html#INSTALL-SHORT-MESON)
    * [17.4.2. Installation Procedure](install-meson.html#INSTALL-PROCEDURE-MESON)
    * [17.4.3. `meson setup` Options](install-meson.html#MESON-OPTIONS)

* [17.5. Post-Installation Setup](install-post.html)

  * *   [17.5.1. Shared Libraries](install-post.html#INSTALL-POST-SHLIBS)
    * [17.5.2. Environment Variables](install-post.html#INSTALL-POST-ENV-VARS)

  * *   [17.6. Supported Platforms](supported-platforms.html)
  * [17.7. Platform-Specific Notes](installation-platform-notes.html)

    

  * *   [17.7.1. AIX](installation-platform-notes.html#INSTALLATION-NOTES-AIX)
    * [17.7.2. Cygwin](installation-platform-notes.html#INSTALLATION-NOTES-CYGWIN)
    * [17.7.3. macOS](installation-platform-notes.html#INSTALLATION-NOTES-MACOS)
    * [17.7.4. MinGW/Native Windows](installation-platform-notes.html#INSTALLATION-NOTES-MINGW)
    * [17.7.5. Solaris](installation-platform-notes.html#INSTALLATION-NOTES-SOLARIS)

This chapter describes the installation of PostgreSQL using the source code distribution. If you are installing a pre-packaged distribution, such as an RPM or Debian package, ignore this chapter and see [Chapter 16](install-binaries.html "Chapter 16. Installation from Binaries") instead.

If you are building PostgreSQL for Microsoft Windows, read this chapter if you intend to build with MinGW or Cygwin; but if you intend to build with Microsoft's Visual C++, see [Chapter 18](install-windows.html "Chapter 18. Installation from Source Code on Windows") instead.