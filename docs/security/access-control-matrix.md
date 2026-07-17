# Access Control Matrix (هدف)

| سطح                   | Public | Member/Proxy                  | Care team                        | Admin/Reviewer        | Provider            | Auditor                   |
| --------------------- | ------ | ----------------------------- | -------------------------------- | --------------------- | ------------------- | ------------------------- |
| محتوای عمومی approved | Read   | Read                          | Read                             | Govern by role        | Read                | Audit metadata            |
| پروفایل شخص           | No     | Own/consented scope           | Active care relationship         | Support metadata only | No                  | Audited read by purpose   |
| رکورد بالینی          | No     | Own read + correction request | Relationship+org+purpose+consent | No default access     | No                  | Exceptional audited scope |
| محتوای draft          | No     | No                            | No                               | Workflow role         | Own submission only | Audit metadata            |
| audit trail           | No     | Own understandable view       | Own actions/authorized           | Scoped                | Own org             | Read by mandate           |

Enforcement همیشه server-side و ترکیب RBAC+ABAC است: organization، care relationship، geography، consent، proxy scope/expiry، sensitivity و purpose-of-use. `break-glass` دلیل، TTL، AuditEvent، notification و post-review می‌خواهد.
