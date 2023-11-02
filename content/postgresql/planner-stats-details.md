## Chapter 76. How the Planner Uses Statistics

**Table of Contents**

  * *   [76.1. Row Estimation Examples](row-estimation-examples.html)
  * [76.2. Multivariate Statistics Examples](multivariate-statistics-examples.html)

    

  * *   [76.2.1. Functional Dependencies](multivariate-statistics-examples.html#FUNCTIONAL-DEPENDENCIES)
    * [76.2.2. Multivariate N-Distinct Counts](multivariate-statistics-examples.html#MULTIVARIATE-NDISTINCT-COUNTS)
    * [76.2.3. MCV Lists](multivariate-statistics-examples.html#MCV-LISTS)

* [76.3. Planner Statistics and Security](planner-stats-security.html)

This chapter builds on the material covered in [Section 14.1](using-explain.html "14.1. Using EXPLAIN") and [Section 14.2](planner-stats.html "14.2. Statistics Used by the Planner") to show some additional details about how the planner uses the system statistics to estimate the number of rows each part of a query might return. This is a significant part of the planning process, providing much of the raw material for cost calculation.

The intent of this chapter is not to document the code in detail, but to present an overview of how it works. This will perhaps ease the learning curve for someone who subsequently wishes to read the code.