## Chapter 24. Localization

**Table of Contents**

* [24.1. Locale Support](locale.html)

  * *   [24.1.1. Overview](locale.html#LOCALE-OVERVIEW)
    * [24.1.2. Behavior](locale.html#LOCALE-BEHAVIOR)
    * [24.1.3. Selecting Locales](locale.html#LOCALE-SELECTING-LOCALES)
    * [24.1.4. Locale Providers](locale.html#LOCALE-PROVIDERS)
    * [24.1.5. ICU Locales](locale.html#ICU-LOCALES)
    * [24.1.6. Problems](locale.html#LOCALE-PROBLEMS)

* [24.2. Collation Support](collation.html)

  * *   [24.2.1. Concepts](collation.html#COLLATION-CONCEPTS)
    * [24.2.2. Managing Collations](collation.html#COLLATION-MANAGING)
    * [24.2.3. ICU Custom Collations](collation.html#ICU-CUSTOM-COLLATIONS)

* [24.3. Character Set Support](multibyte.html)

  * *   [24.3.1. Supported Character Sets](multibyte.html#MULTIBYTE-CHARSET-SUPPORTED)
    * [24.3.2. Setting the Character Set](multibyte.html#MULTIBYTE-SETTING)
    * [24.3.3. Automatic Character Set Conversion Between Server and Client](multibyte.html#MULTIBYTE-AUTOMATIC-CONVERSION)
    * [24.3.4. Available Character Set Conversions](multibyte.html#MULTIBYTE-CONVERSIONS-SUPPORTED)
    * [24.3.5. Further Reading](multibyte.html#MULTIBYTE-FURTHER-READING)

This chapter describes the available localization features from the point of view of the administrator. PostgreSQL supports two localization facilities:

* Using the locale features of the operating system to provide locale-specific collation order, number formatting, translated messages, and other aspects. This is covered in [Section 24.1](locale.html "24.1. Locale Support") and [Section 24.2](collation.html "24.2. Collation Support").
* Providing a number of different character sets to support storing text in all kinds of languages, and providing character set translation between client and server. This is covered in [Section 24.3](multibyte.html "24.3. Character Set Support").