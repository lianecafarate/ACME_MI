# ACME Inc. Order Processing and Sales Data API

## Overview

This project demonstrates a solution for ACME Inc., a fictional e-commerce company, to reliably process customer orders, integrate data with internal systems, and securely expose this information via APIs. The demonstration utilizes WSO2 Micro Integrator for integration workflows and WSO2 API Manager for API exposure and management.

## Table of Contents

- [Scenario](#scenario)
- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Demonstration Flows](#demonstration-flows)
  - [Order API Flow](#order-api-flow)
  - [Sales API Flow](#sales-api-flow)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Database Script](#database-script)

## Scenario

Acme Inc. requires a robust system to:
* Process customer orders from their online platform.
* Integrate order data with internal systems.
* Provide controlled, secure access to processed order information for internal or external applications.
The system must ensure accurate data transformation and reliable recording of order details into an internal database, guaranteeing data integrity for fulfillment, inventory management, and reporting. It also needs to handle temporary failures in downstream systems to prevent data loss.

## Problem Statement

Acme Inc. needs to guarantee that every customer order is successfully processed, its data accurately transformed and stored, and this processed information securely exposed as a managed API. This includes mechanisms for access control, rate limiting, and API documentation.

## Proposed Solution

The proposed solution leverages the WSO2 platform to ensure guaranteed order delivery, data transformation, processing and managed API exposure.

* **WSO2 Micro Integrator**: Handles the integration logic, including:
    * Receiving orders via an API.
    * Publishing orders to a reliable message queue (AWS SQS) for guaranteed delivery.
    * Consuming messages from the queue.
    * Transforming order data (e.g., date format changes, merging fields using Script Mediators and Data Mapper).
    * Storing processed data into a MySQL database using the DB Report Mediator.
    * Retrieving data from the database for the Sales API using the DBLookup Mediator.
    * Transforming data for the Sales API response using Script and PayloadFactory Mediators. 
* **WSO2 API Manager**: Manages, secures, publishes, and monitors the Order and Sales APIs.
* **AWS SQS**: Used as the message queuing service for reliable order processing.

## Demonstration Flows

![Demonstration Flows](https://github.com/lianecafarate/ACME_MI/blob/main/assets/images/Flows.png)

### Order API Flow
1.  **Receive Order**: Customers place an order via a POST request to the Order API endpoint, managed by the WSO2 API Manager. 
2.  **Queue Publishing**: The Micro Integrator receives the order and publishes it to an AWS SQS queue using the WSO2 Amazon SQS connector. 
3.  **Queue Consumption**: An AmazonSQS Inbound Endpoint in the Micro Integrator consumes messages from the SQS queue. 
4.  **Data Transformation**:
    * Order date format is transformed (e.g., from MM/dd/yyyy to yyyy-MM-dd) using a Script Mediator. 
    * Order date and time are merged into a single `orderTimeStamp` field using the Data Mapper mediator. 
5.  **Database Storing**: Transformed order details are inserted into a MySQL database (tables: `orders`, `order_items`, `customers`) using the DB Report Mediator.

### Sales API Flow
1.  **Retrieve Sales Data**: Consumers request sales data for a specific customer via a GET request to the Sales API endpoint, managed by the WSO2 API Manager.
2.  **Database Retrieval**: The Micro Integrator uses the DBLookup Mediator to fetch aggregated sales data (e.g., total orders, total amount spent, latest order timestamp) from the MySQL database.
3.  **Data Transformation**:
    * The `lastOrderTimestamp` is reformatted to `mm/dd/yyyy` using a Script Mediator. 
    * The final response payload is formatted using the PayloadFactory Mediator. 

## Technologies Used

* **WSO2 Micro Integrator**: For low-code integration and creating ESB-style or microservices architecture.
* **WSO2 API Manager**: For full API lifecycle management (design, publish, secure, monitor).
* **WSO2 Micro Integrator Extension for VS Code**: For developing integration solutions. 
* **AWS SQS (Simple Queue Service)**: For reliable message queuing.
* **MySQL**: As the backend database. 

## Prerequisites
* WSO2 Micro Integrator 4.4.
* WSO2 API Manager 4.5 (optional, if you want to manage the APIs as shown in the demo).
  * If using WSO2 API Manager, create and publish the OrderAPI and SalesAPI, pointing them to the deployed Micro Integrator endpoints. It is easier if you use the [Service Catalog](https://mi.docs.wso2.com/en/latest/install-and-setup/setup/deployment/deploying-wso2-mi/#service-catalog) feature.
* AWS SQS queue set up and accessible.
* MySQL database instance.

## Database Script
![DB Diagram](https://github.com/lianecafarate/ACME_MI/blob/main/assets/images/DBDiagram.png)
File: [https://github.com/lianecafarate/ACME_MI/blob/main/assets/database/mysql.sql](https://github.com/lianecafarate/ACME_MI/blob/main/assets/database/mysql.sql)


