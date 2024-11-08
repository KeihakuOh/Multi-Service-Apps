# Ticketing App

## Overview

これは学習目的で開発したシンプルなチケティング E コマースアプリケーションです。以下の機能をサポートする。

チケットの作成、編集、削除

チケットの注文　 

チケットの購入

## App Architecture Overview

このチケットアプリは、バックグラウンドで実行される 6 つの小規模な独立したサービスで構成されたマイクロサービスアプリケーションです。Auth、Client、Tickets、Orders、Payments、Expiration の 6 つのサービスが存在します。これらのサービスは Kubernetes クラスタにデプロイされ、各サービスへの外部からのトラフィックのロードバランシングは Ingress コントローラによって管理されます。アプリケーションはマイクロサービスアーキテクチャに従っているため、各サービスは直接通信を行いません。代わりに、各サービスがタスクを実行するたびにイベントが発行され、そのイベントは NATS Streaming Server に送信されます。このサーバーをイベントバスとして利用し、適切なサービスにイベントを転送します。

<img src="/images/readme/appImage.png">

## Client Service

### overview

クライアントサービスは React アプリを提供し、ユーザーのアクションに基づいて他のサービスと通信します。たとえば、ユーザーがチケットの作成画面でタイトルと価格を入力し、「送信」ボタンをクリックすると、HTTP POST リクエストがチケットサービスに送信される仕組みです。現在、認証関連の実装のみが完了しています。

## Auth Service

### overview

認証サービスは、ユーザー認証に関する機能を提供します。主な機能としては、サインアップ（ユーザー登録）、サインイン、サインアウト、そして現在のユーザー情報の取得があります。サインアップ時には、ユーザー情報がデータベースに登録され、サーバーサイドでセッション管理のために JWT（JSON Web Token）が生成されます。また、JWT を使用して認証されたユーザー情報をリクエストオブジェクトに追加するミドルウェアもあり、一度ログインしたユーザーは再度サインインする必要がありません。

### Root

<img src="/images/readme/auth/rootAuth.png">

### Data Model

<img src="/images/readme/auth/dataAuth.png">

## Ticket Service

### overview

チケットサービスは、チケットの作成、取得、更新の機能を提供し、NATS Streaming サーバーを介してイベントを発行します。 また、作成または更新されたすべてのチケットを保存するために独自の MongoDB データベースを維持しています。

### Root

<img src="/images/readme/tickets/rootTicket.png">

### Data Model

<img src="/images/readme/tickets/dataTicket.png" width="300">

### Event

このサービスには以下の種類のイベントがあり、次の図のように他のサービスに発行されます。

ticket:created

<img src="/images/readme/tickets/eventTicketCreated.png" width="500">

ticket:updated

<img src="/images/readme/tickets/eventTicketUpdated.png" width="500">

## Order Service

### overview

注文サービスは、チケットの注文を作成、取得、削除する機能を提供し、NATS Streaming サーバーを介してイベントを発行します。また、すべての注文を保存するために専用の MongoDB データベースを管理しています。

### Root

<img src="/images/readme/orders/rootOrder.png">

### Data Model

<img src="/images/readme/orders/dataOrder.png">

### Event

このサービスには以下の種類のイベントがあり、次の図のように他のサービスに発行されます。

order:created

<img src="/images/readme/orders/eventOrderCreated.png" width="500">

order:cancelled

<img src="/images/readme/orders/eventOrderCancelled.png" width="500">

## Payment Service

### overview

支払いサービスは、ユーザーが注文に対して支払いを行う機能を提供します。Stripe を使用して支払いを処理し、データベースに支払い情報を記録した後、NATS Streaming サーバーを介してイベントを発行します。

### Root

<img src="/images/readme/payments/rootPayments.png">

### Data Model

<img src="/images/readme/payments/dataPayments.png">

### Event

このサービスには以下の種類のイベントがあり、次の図のように他のサービスに発行されます。

<img src="/images/readme/payments/eventPaymentCreated.png" width="500">

## Expiration Service

### overview

有効期限サービスは、注文が作成された際にその有効期限を管理し、有効期限が切れると注文ステータスを更新するジョブをキューにスケジュールします。

### Event

このサービスには以下の種類のイベントがあり、次の図のように他のサービスに発行されます。

<img src="/images/readme/expiration/eventExpirationComplete.png" width="500">
