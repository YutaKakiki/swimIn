# SwimInとは？
**友達が寝ているかどうかがわかる**、睡眠SNSとなっています。

<a href="https://gyazo.com/141b37190b778b6693a26822779cf951"><img src="https://i.gyazo.com/141b37190b778b6693a26822779cf951.gif" alt="Image from Gyazo" width="200"/></a>　　<a href="https://gyazo.com/6970601238dd06aee552f388ac1c8a69"><img src="https://i.gyazo.com/6970601238dd06aee552f388ac1c8a69.gif" alt="Image from Gyazo" width="198"/></a>

もう少し具体的にいうと
- いつ寝たのか/起きたのか
- いつ起きるのか（目標起床時刻）
- 目標起床時刻と実際起床時刻の差
    - 目標ピッタリに起床
    - 〇〇時間〇〇分寝坊
    - 〇〇分早く起床
- 寝坊しているかどうか（目標起床時刻を基準に）
- コメント

といった情報を、閲覧できるようになっています。

「機能」にて後述しますが、ユーザの寝る時、起きた時の「打刻」によって睡眠情報が管理されており、その情報から**平均睡眠時間、睡眠時間、目標起床時刻の達成度**が週/月スパンで可視化できるようになっています。

# SwimIn開発の経緯
このようなアプリを構想したキッカケは、位置共有サービス「Zenly」の終了にあります。ご存知でない方もいるかもしれませんが、Zenlyには「睡眠中」と表示される機能がありました。
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3657525/ffc4e680-0997-3e48-ebc2-11c764d3b175.png" width="400px"/>
今も位置共有サービスが代替して現れていますが、このような機能は見当たりません。
しかし、私自身、この機能はとても気に入っていましたし、周りの友人も「こいつ寝てるから学校こないんやん、電話して起こそう」みたいな使い方をしていて、結構使い勝手が良かったのです。
そこで、他人の睡眠中/起床中がわかるSNSを作ろう！と思い立ったわけです。


# 機能

### 認証系
- サインアップ/サインイン/サインアウト
[devise_token_auth]("https://github.com/lynndylanhurley/devise_token_auth")を使って実装しました。

### プロフィール機能
|ユーザ情報の編集　|
| ---- |
|<a href="https://gyazo.com/3fdec7cb7cd005077dd272f24399d1d9"><img src="https://i.gyazo.com/3fdec7cb7cd005077dd272f24399d1d9.gif" alt="Image from Gyazo" width="200"/></a>|
|・名前/email/プロフィール画像の編集<br>　現段階において、プロフィール画像に関しては、[Gravatar]("https://ja.gravatar.com/")を使用しています |

### フォロー機能
|友達検索　→友達追加|「追加されています」|
|:----|:----|
|<a href="https://gyazo.com/ad2dda7358d7940f1ae3801b42b93af6"><img src="https://i.gyazo.com/ad2dda7358d7940f1ae3801b42b93af6.gif" alt="Image from Gyazo" width="200"/></a>|<a href="https://gyazo.com/2b48c844f98297e532159ab93529e1a8"><img src="https://i.gyazo.com/2b48c844f98297e532159ab93529e1a8.gif" alt="Image from Gyazo" width="200"/></a>|
|・メールアドレスで他のユーザーを検索、追加|・自分を追加しており、<br>　かつ自分が追加していないユーザーを表示　<br>・ここからユーザをーを追加することも可能|

### コア機能
|おやすみ打刻|おはよう打刻|
|----|----|
|　<a href="https://gyazo.com/d34c204da455b56648aecc6fd3af4e71"><img src="https://i.gyazo.com/d34c204da455b56648aecc6fd3af4e71.gif" alt="Image from Gyazo" width="200"/></a>　|　<a href="https://gyazo.com/2e38cfb6f236d69a3ced23c9c4f4cd2f"><img src="https://i.gyazo.com/2e38cfb6f236d69a3ced23c9c4f4cd2f.gif" alt="Image from Gyazo" width="200"/></a>|
|・目標起床時刻を設定<br>・睡眠時間（予定）を表示<br>・コメント|・睡眠時間が算出してして、表示<br>・目標起床時刻との差を表示<br>・「ぴったりに起床！」<br>　「〜分寝坊...」<br>　「〜分早く起床」　のパターン

|友達の睡眠状態閲覧|||
|----|----|----|
|一覧|詳細||
|<a href="https://gyazo.com/0812d2516bbf38ae38c8974d28963fe5"><img src="https://i.gyazo.com/0812d2516bbf38ae38c8974d28963fe5.png" alt="Image from Gyazo" width="200"/></a>|<a href="https://gyazo.com/3234fecb49b428fdd1c666ef42471a10"><img src="https://i.gyazo.com/3234fecb49b428fdd1c666ef42471a10.gif" alt="Image from Gyazo" width="200"/></a>|<a href="https://gyazo.com/78e5fc4d02577f469166529c54b8fa6c"><img src="https://i.gyazo.com/78e5fc4d02577f469166529c54b8fa6c.gif" alt="Image from Gyazo" width="200"/></a>|
|・睡眠中/起床中を表示　<br/>・寝坊アラート表示|・目標起床時刻<br/>・就寝時刻|・起床時刻<br/>・睡眠時間|

|睡眠履歴閲覧||
|----|----|
|機能説明モーダル|平均睡眠時間/グラフ|
|<a href="https://gyazo.com/4caeb5885e72b815e22445219b72ba8e"><img src="https://i.gyazo.com/4caeb5885e72b815e22445219b72ba8e.gif" alt="Image from Gyazo" width="205"/></a>|<a href="https://gyazo.com/b0d392036502025265d38bcbe5ab58c4"><img src="https://i.gyazo.com/b0d392036502025265d38bcbe5ab58c4.gif" alt="Image from Gyazo" width="210"/></a>|
|・グラフの読み方などを説明|・週 / 月単位の切り替え <br> ・平均睡眠時間 <br> ・グラフ表示　<br>　・睡眠時間（棒グラフ）　<br>　・目標起床時刻との差<br/>　　(折れ線グラフ)|



## 使用技術
|カテゴリ|技術|
|----|----|
|フロントエンド|typescript(5.0),React(18.0),Next.js(14.1.4)|
||・Yup(フォームバリデーション)<br/> ・MUI（UIコンポーネント）|
|バックエンド|ruby(3.1.2),rails(7.0.8)|
||・devise_auth_token(認証系)|
|データベース|mySQL2|
|インフラ|AWS ECS Fargate|
|Webサーバー|Nginx|
|環境構築|docker , docker-compose|
|CI/CD|GithubActions|

### アーキテクチャ
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3657525/559a6482-8f37-0d07-3b65-67bba8a25deb.png)
(https://zenn.dev/ddpmntcpbr/books/rna-hands-on/viewer/intro#%E6%A7%8B%E6%88%90%E5%9B%B3)

### ER図
- (書き方合ってるのか...?)
    
<a href="https://gyazo.com/66bbadfe863eb74f24eb2cb2287e7d58"><img src="https://i.gyazo.com/66bbadfe863eb74f24eb2cb2287e7d58.png" alt="Image from Gyazo" width="546"/></a>

### 記事
[睡眠をテーマにした新しいSNS「SwimIn」を紹介させてください(Qiita)](https://qiita.com/YutaKakiki/items/be79f1c32e09a728d8f5)
