
## Rule
### Commit Type

- feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
- fix : 기능에 대한 버그 수정
- build : 빌드 관련 수정
- chore : 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
- ci : CI 관련 설정 수정
- docs : 문서(주석) 수정
- style : 코드 스타일, 포맷팅에 대한 수정
- refactor : 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경
- test : 테스트 코드 추가/수정
- release : 버전 릴리즈

## REST API

### URI 

#### 1. 마지막에 `/` 를포함하지 않는다.

**Bad**

```
http://api.test.com/users/
```

**Good**

```
http://api.test.com/users
```

#### 2. _(underbar) 대신 -(dash)를 사용한다.

-(dash)의 사용도 최소한으로 설계한다. 정확한 의미나 표현을 위해 단어의 결합이 불가피한 경우 반드시 -(dash) 사용한다.

**Bad**

```
http://api.test.com/users/post_commnets
```

**Good**

```
http://api.test.com/users/post-commnets
```

#### 3. 소문자를 사용한다.

**Bad**

```
http://api.test.com/users/postCommnets
```

**Good**

```
http://api.test.com/users/post-commnets
```

#### 4. 행위(method)는 URI 에 포함하지 않는다.

**Bad**

```
POST http://api.test.com/users/1/delete-post/1
```

**Good**

```
DELETE http://api.test.com/users/1/posts/1
```

#### 5. 컨트롤 자원을 의미하는 URI 는 예외적으로 동사를 허용한다.

함수처럼, 컨트롤 리소스를 나타내는 URL은 동작을 포함하는 이름을 짓는다.

**Bad**

```
http://api.test.com/posts/duplicating
```

**Good**

```
http://api.test.com/posts/duplicate
```

### Use HTTP status

#### 1. 의미에 맞는 HTTP status 를 리턴한다.

**Bad**

```http
HTTP/1.1 200 OK

{
    "result" : false
    "status" : 400
}
```

- status는 `200`으로 성공인데 body 내용엔 실패에 관한 내용을 리턴하고 있다.
  - 모든 응답을 `200`으로 처리하고 body 내용으로 `성공|실패`를 판단하는 구조에서 사용된다. 잘못된 설계다.

**Good**

```http
HTTP/1.1 400 Bad Request

{
    "msg" : "check your parameter"
}
```

#### 2. HTTP status 만으로 상태 에러를 나타낸다.

세부 에러 사항은 응답 객체에 표시하거나, 해당 에러를 확인할 수 있는 link를 표시한다.

**http 상태 코드를 응답 객체에 중복으로 표시할 필요 없다.**

**Bad**

```http
HTTP/1.1 404 Not Found

{
    "code" : 404,
    "error_code": -765
}
```

**Good**

```http
HTTP/1.1 404 Not Found

{
    "code" : -765,
    "more_info" : "https://api.test.com/errors/-765"
}
```

### HTTP status code

#### 2XX Success

- 200 OK
- 201 Created
- 202  Accepted
- 204 No Content

#### 4XX Client errors

- 400 Bad Request

- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowd
- 409 Conflict
- 429 Too many Requests

#### 5XX Server errors

### `5XX` 에러는 사용자에게 나타내지 않는다.