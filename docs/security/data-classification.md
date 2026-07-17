# Data Classification

| سطح                   | نمونه                           | کنترل حداقلی                                                                      |
| --------------------- | ------------------------------- | --------------------------------------------------------------------------------- |
| Public                | محتوای approved عمومی           | integrity/versioning                                                              |
| Internal              | config غیرحساس، runbook         | authenticated staff، no public logs                                               |
| Confidential          | قرارداد، گزارش داخلی            | least privilege، encryption، audit                                                |
| Sensitive Health Data | شناسه فرد، رکورد سلامت، consent | field/data minimization، encryption، strict ABAC، sensitive-read audit، redaction |

PHI/PII، OTP، token، secret، prompt/output حساس و raw payload در log/trace/metric/error/test artifact ممنوع است. Foundation فقط داده ثابت غیرشخصی دارد.
