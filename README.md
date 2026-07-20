**Sydeign** is a general e-commerce store made to highlight local artists, giving them an opportunity to market their traditional and/or digital works, and provide a means for customers to follow artists and be updated with their upcoming pieces for sale.

This is an overhaul of the [old Sydeign website](https://github.com/moodLearning/sydeign-dev#introduction), where we pivot from using OpenCart to a headless setup using Shopify Hydrogen to make the storefront to access Shopify's API endpoints.
# Setup
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

### Payment Provider

Go to **Settings > Payments**. A development store can only process test payments, which can be done by activating the test payment provider and/or setting the payment provider to test mode.

Under **Additional payment providers** search **GCash** and click **Secure Payments via PayMongo**. Verify if Test Mode is toggled on or off after adding the provider to the store by visiting **Settings > Payments > Secure Payments via PayMongo** and scrolling all the way down to the **Test mode** section.

To complete this step, it is required to have a registered and verified PayMongo account, as you will need to get the Public and Secret keys from your account Developer settings and add it to the payment provider details (**Secure Payments via PayMongo > Manage**).
## Shopify Hydrogen for Frontend
## Laravel-Shopify for Backend
## Testing
# Shopify Store Configuration
### Custom Product Fields
### Custom Metaobject Designer

