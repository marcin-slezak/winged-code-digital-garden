We all used to work with many tools and services. It speeds up our work and allows us to focus on the core of a business. Usually, we don't want to resolve issues that already were resolved by someone else. Building a subscription-based product is not an exception. Everyone, who want to build one, needs to implement the whole subscription model that already was implemented many times by other people. Let's see how [Chargebee](https://www.chargebee.com/) can speed up subscription model implementation in your next SaaS product.


A subscription model is an approach where a customer needs to pay a regular price at regular intervals to access a product—business benefits from predictable, recurring income. Customers don't need to pay a considerable price upfront. It's no wonder that so many companies use a subscription model for own products. We used to have access to software in a subscription model (Photoshop, Slack, Gmail, Atlassian, MailChimp, Dropbox etc.). Still, an idea spread for other products like media and content (Netflix, Spotify, Youtube) or even physical goods (Grover). The subscription model is a challenge for software development. Customer management, offer configuration, subscription periods, payments, invoicing and taxes, discounts, and many other elements can take many months to implement correctly.

Chargebee is a service that covers all boring subscription model related tasks and allows teams to focus on building and launching their own business. You can use Chargebee to manage:

 -   **customers**  including billing information, payment information, financial balance, etc.
 -  **subscriptions** including base cost, billing frequency, trial period, duration, applicable credits or additional charges.
 -  **plans** that describe your offer, it is some kind of template for future subscriptions with a defined frequency of billing, duration and pricing

Chargebee provides a panel on the website for non-technical people to manage a system and REST API that allows integrating with your application. To make integration even faster, Chargebee provides client libraries for most popular languages like PHP, Ruby, Python, Java, .Net or NodeJs.

## Checkout process

**Plans**, **customers** and **subscriptions** can be added by the administrator manually. Usually, only **plans** need to be configured as **customers** and **subscriptions** are generally added to the system by **the checkout process**. Checkout is a process where the customer creates an account, chooses a subscription plan, and is charged automatically periodically. Chargebee built components and pages that facilitate building checkout on your website. If components and pages configuration is too limited for you, you can always make checkout on your own and use Chargebee API to push order data to Chargebee. Of course, this approach requires more work but gives you much more control over the user experience.

Chargebee, based on subscription configuration, calculate when and how much charge customers for a product. Chargebee creates **invoices** automatically and trigger **payment transactions** but do not charge customers directly. **Instead, the payment transaction** is processed by **payments gateway** providers like Stripe, PayPal or Braintree. Chargebee support and integrate with over 25 different **payment gateways**. Each **payment gateway** has own list of supported payment methods like Credit Card, Direct Debit, Digital Wallets etc. The configuration is straightforward and should not be a problem even for a non-technical person. **Invoices** and **payment transactions** can be managed by the website panel and API.


## How to integrate with Chargebee

Your product is the most important, and you need to ensure that your application can handle many customers and separate their data respectively. The simplest implementation can assume that the customer is also a single user who has access to your product. Often, it's not so simple, and **the tenant** concept needs to be implemented. A **tenant** is a person or the organization that owns and manages access to your product. Whether you follow a single-tenant architecture (separated infrastructure for each tenant), multi-tenant architecture (tenants share the same infrastructure) or any hybrid solution. Tenant and user access logic is specific for each project, and that is what you need to implement yourself. For example, you can use Chargebee API (HTTP based, REST) to get information about tenants who subscribed to products and the status of their subscriptions, but you need to figure out yourself how to map it to specific users.

Chargebee provides a few key features that help Software Developers to build and support integration:

-   separated **test environment** from **the production environment.** It will help you to test new configuration, scripts and integration changes before deploying on production,
-   **webhook system**. You can configure HTTP endpoints in your application that will be triggered by Chargebee on specific events (e.g. customer created, updated, invoice generated, payment updates etc.). It's far more efficient as webhooks helps to reduce unnecessary API polling.
-   **events** list. The administrator can use the web browser panel to list event history including payload, connected webhooks and webhook responses.
-   **custom fields** that can be added to customers, subscriptions or plans objects in Chargebee. Each custom field has its own type (e.g. string, date, boolean, list) that allow displaying custom fields in the right way for administrators on a web browser panel. Custom fields are accessible from API.
-   **time machine,** a unique solution that gives you a possibility to emulate time flow in the system and test configuration impact for scheduled Chargebe activates like invoicing

Building your custom checkout process gives you complete control over user experience, but it requires some attention to security aspects. Two most important constraints:

-   PCI DSS (Payment Card Industry Data Security Standard) - is a set of practices and procedures required if you process, store, or transmit card details. The easiest way is to try not to handle customers' card details at any point of the transaction. For example, if you use Stripe as a payment gateway, you can use Stripe.js library to tokenize sensitive information without ever having it touch your server. For this case, to be PCI DSS compliant, you need to fill up a relatively short Self-Assessment Questionnaire.
-   PSD2 (European Union Revised Payment Services Directive) introduced the requirement of additional SCA (Strong Customer Authentication) for online transactions. Based on customer history, the payment gateway decides about the need for other authentication.

Components or pages built by Chargebee are compliant with PCI DSS and PSD2.

## Much more for much less

The subscription model is not so simple after all and brings a lot of new challenges to the business. A growing number of invoices and payments makes manual accounting processes inefficient. Chargebee has a set of features (emails, retries) that address issues like expired credit cards or insufficient funds. It's just a matter of time when taxes configuration, price based on usage, coupons, paid add-ons, or advance reporting will be on the board. Chargebee is a practical tool that covers all of those issues. 

![[Pasted image 20210911234507.png]]