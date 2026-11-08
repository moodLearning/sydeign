[Sydeign](https://sydeign-storefront.ardelavega.workers.dev/) is a general e-commerce store made to highlight local artists, giving them an opportunity to market their traditional and/or digital works, and provide a means for customers to follow artists and be updated with their upcoming pieces for sale.

This is an overhaul of the [old Sydeign website](https://github.com/moodLearning/sydeign-dev#introduction), where we pivot from using OpenCart to a headless setup using Shopify Hydrogen to make the storefront to access Shopify's API endpoints.

The revamped one currently using a development Shopify store populated with sample Designers and Products can be accessed [here](https://sydeign-ypslvqn7.myshopify.com/).
# Setup

## Shopify Hydrogen for Frontend

Storefront directory was setup with Shopify CLI, which has the following prerequisites:
- [Node.js](https://nodejs.org/en/download/): 22.12 or higher
- A Node.js package manager: [npm](https://www.npmjs.com/get-npm), [Yarn 1.x](https://classic.yarnpkg.com/lang/en/docs/install), or [pnpm](https://pnpm.io/installation).
- [Git](https://git-scm.com/downloads): 2.28.0 or higher

Create a Shopify project by running `npm install -g @shopify/cli@latest` in a directory. Modify the following `.env` variables:

```
PUBLIC_STORE_DOMAIN="your-store-domain.myshopify.com"
PUBLIC_STOREFRONT_API_TOKEN="your_storefront_access_token_here"
PUBLIC_STOREFRONT_API_VERSION="2024-04"
```

## Shopify

After creating a [Shopify account](https://www.shopify.com/ph), one can proceed with making their development store.
### Shopify Development Store

Logging in Shopify leads you to the admin dashboard where you can view action items for a development store you made. All stores follow the format *your-store-name.myshopify.com*, which is what you will be setting as your **PUBLIC STORE DOMAIN** in your .env files.
### Shopify Headless

There are two important access points--the storefront and the customer account API. Storefront enables retrieving shop items such as products and orders placed, while customer account enables features such as Customer Account login, tracking of order history, transactions and placing orders, etc.
#### Storefront API

Storefront API can be accessed from the Development store dashboard (*admin.shopify.com/...*) and going to **Settings > Sales Channels > Headless > Open App > Storefront > Storefront API**, where you will find the following keys after clicking **Manage**:

| Storefront API Credentials | .env Keys                                                   |
| -------------------------- | ----------------------------------------------------------- |
| Public access token        | PUBLIC_STOREFRONT_ACCESS_TOKEN, PUBLIC_STOREFRONT_API_TOKEN |
| Private access token       | PRIVATE_STOREFRONT_ACCESS_TOKEN                             |
You may also configure storefront API permissions on this page.
#### Customer Account API

Customer Account API can be accessed from the Development store dashboard (*admin.shopify.com/...*) and going to **Settings > Sales Channels > Headless > Open App > Storefront > Customer Account API**, where you will find the following keys after clicking **Manage**:

| **Customer Account API Credentials** | .env Keys                             |
| ------------------------------------ | ------------------------------------- |
| Client ID                            | PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID |
You may also configure customer account API permissions on this page, and copy the following application endpoints:
- Authorization endpoint
- Token endpoint
- Logout endpoint

Details of the client application to request and retrieve data and/or perform operations can be inputted in the **Application Setup** window at the bottom.
 
### Shopify Store Application

Since the Hydrogen sales channel is inaccessible with the free plan, we workaround this by making a custom application for the development store to host it. Create an application by going to **Settings > Apps > Develop Apps** and then creating a new application. 

- The `redirect-URL` must be set to the public URL provided by your chosen tunnelling service/host with `/authenticate` appended to it, e.g. `https://my-ngrok-domian.ngrok-free.dev/authenticate`.
- The `app-url` must be set to the public URL provided by your chosen tunnelling service/host.

After making the application, click the application and then go to **Settings**, where you will see **Client ID** and **Secret**. The secret will be what you will set as the value for **SHOPIFY_ADMIN_ACCESS_TOKEN** in your .env.

Note that every time you change your public URL, e.g. you need to regenerate your tunnelling service provided-URL, you will need to create a new version of the application with updated App URL and Redirect URL values.

### Payment Provider

Go to **Settings > Payments**. A development store can only process test payments, which can be done by activating the test payment provider and/or setting the payment provider to test mode.

Under **Additional payment providers** search **GCash** and click **Secure Payments via PayMongo**. Verify if Test Mode is toggled on or off after adding the provider to the store by visiting **Settings > Payments > Secure Payments via PayMongo** and scrolling all the way down to the **Test mode** section.

To complete this step, it is required to have a registered and verified PayMongo account, as you will need to get the Public and Secret keys from your account Developer settings and add it to the payment provider details (**Secure Payments via PayMongo > Manage**).


# Shopify Store Configuration

### Redirect from Shopify Theme

For the store to use the custom theme you made in the storefront, you must modify the source code of the theme the store is currently using. To do this, you must open your shop admin dashboard and go to **Sales Channels > Online Store > Three-dot Menu to the left of Edit Theme > Edit Code > theme.liquid**.

Once in the `theme.liquid` file, insert the following script right at the start of `<head>`:

```
<script>

      // Redirect visitors from the Liquid Online Store to your Hydrogen storefront

      const isCheckoutOrAdmin = window.location.pathname.includes('/checkout') || window.location.pathname.includes('/admin');

      if (!isCheckoutOrAdmin) {

        const storefrontDomain = "REDIRECT LINK HERE";

        window.location.replace(storefrontDomain + window.location.pathname + window.location.search);

      }

</script>
```

where the redirect link is either `https://localhost:3000` or whatever public URL your tunnelling service provides you (e.g. `xxxx-xxxx.ngrok-free.dev').

### Custom Product Fields

The `Product` has the following additional metafield definitions:

| Definition Name          | Variable                  | Type                                     |
| ------------------------ | ------------------------- | ---------------------------------------- |
| ***Reviews List***       | custom.reviews_list       | LIST Customer Review (Metaobject)        |
| ***Rating Count***       | custom.rating_count       | Integer                                  |
| ***Rating***             | custom.rating             | Rating, validation: [min(1.0), max(5.0)] |
| ***Designer Reference*** | custom.designer_reference | Designer (Metaobject)                    |

### Custom Metaobject Designer

The `Designer` (type `designer`) custom metaobject has the following fields:

| Field Name             | Type                           |
| ---------------------- | ------------------------------ |
| ***Name***             | Single-line text               |
| ***Bio***              | Multi-line text                |
| ***Profile Picture***  | Image (File)                   |
| ***Banner Image***     | Image (File)                   |
| ***Social Links***     | Link                           |
| ***Style***            | Choice list (Single-line text) |
| ***isFeatured***       | Boolean                        |
| ***Average Rating***   | Decimal                        |
| ***Review Count***     | Integer                        |
| ***Card Picture***     | Image (File)                   |
| ***Featured Product*** | Image (File)                   |
| ***Followers***        | Integer                        |
| ***Products***         | Integer                        |




