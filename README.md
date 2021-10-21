# 서버리스 공부

### 서버리스 란?
나의 서버가 필요없이 AWS 서버를 이용하여 처리하는 것이며 
서버리스란 서버가 없다는 의미 이지만 실제로 서버가 없다는 것은 아니다. 클라우드 에서도 서버는 존재 하고 있고 사용자가 관리해야 하는 서버 혹은 컨테이너가 제로(0)에 수렴한다는 뜻이다.  
   서버리스는 필요할 때만 사용할 수 있기 때문에 비용적으로 저렴하고 `Auto Scaling`같은 기술도 필요없고 알아서 확장이 되는 편리함이 있다.

BaaS(Backend as a Service) 혹은 FaaS(Function as a Service) 에 의존하여 작업을 처리하게 되는데 Baas 를 지원하는 서비스는 FireBase 가 있고 Faas 를 지원하는 서비스는 AWS Lambda, Azure Functions, Google Cloud Functions 등 이 있다.

#### FaaS
FaaS 는 함수를 등록하고 실행되는 만큼 비용을 지불하는 방식을 말하며 특정 이벤트가 발생하였을때 실행된다.  
- 주기적으로 실행되게끔 설정할 수 있다.  ex) 5분마다 1시간마다 
- 웹 요청을 처리할 수도 있다. ex) 특정 URL 로 들어오면 특정 작업을 처리 하게끔 설정할 수 있다.
- 콘솔을 통해 직접 호출할 수도 있다.

PaaS(Platform as a Service) 는 서버에서 애플리케이션이 24시간 계속 돌아가는 반면, FaaS 는 애플리케이션이 아닌 함수를 배포하여 계속 실행 되는것이 아닌 특정 이벤트가 발생 했을때 실행이 되고 작업을 마치면 종료 된다는 차이점이 있다.


#### AWS Lambda 란?
서버를 프로비저닝 하거나 관리할 필요 없이 코드를 실행한다.  
모든 유형의 애플리케이션이나 백앤드 서비스에 대한 코드를 별도의 관리 없이 실행이 가능하다.  
코드를 업로드 하면 람다 에서 높은 가용성으로 코드를 실행 및 확장 하는데 필요한 부분을 처리한다.  
다른 AWS 서비스에서 코드를 자동으로 트리거하도록 설정하거나 웹 또는 모바일 앱에서 직접 코드를 호출 할 수 있다.  

프로비저닝이란?
- 사용자의 요구에 맞게 시스템 자원을 할당, 배치 배포해 두었다가 필요 시 시스템을 즉시 사용할 수 있는 상태로 미리 준비해 두는 것을 말한다.

Lambda 의 주요 장점  
인프라에 대한 걱정 없이 코드를 실행 가능하다 -->  NoOps 실현  
트리거를 이용하여 애플리케이션을 자동으로 확장 / 축소 가능  
코드가 병렬로 실행되고 각 트리거는 개별적으로 처리되어 정확히 워크로드 큐모에 맞게 조정됨  
100ms 단위로 코드가 실행되는 시간 및 코드가 트리거 되는 회수를 측정하여 요금을 부과하고, 코드가 실행되지 않으면 요금이 부과되지 않음.

#### Lambda 사용사례
람다를 다른 AWS 서비스와 조합하면 사용하면 더 큰 시너지를 낼 수 있다는게 또 다른 장점이다.
실시간 파일 처리


___
### 환경설정 준비

(docker 이미지를 통해 설정 연습)  
터미널 켜서 `docker run -it amazonlinux bash` 입력 하여 bash환경 접속  
내부 환경에 `python3` 가 설치 되어 있지 않으니 설치 진행  
  
> `yum update -y`  
> `yum install python3 -y`
 
 커멘드를 이용하여 설치를 완료하여 준다.  
 
 **root** 환경에 설치를 하고 진행을 하게 되면 추후 관리 이슈가 있을 수 있으니 `virtualenv` 를 이용하여 파이썬 환경을 고립, 분리 시켜 사용하는것이 좋다

 파이썬 을 설치하면 `pip3` 을 사용가능 하니 이를 이용하여 설치를 진행한다

 `pip3 install virtualenv`  입력하여 패키지 설치  
 패키지들의 위치가 궁금하면 `yum install which` 설치 하여 `which python3` 입렵하여 위치 확인가능  

 `virtualenv -p /usr/bin/python3 py37` 원하는 위치에서 파이썬3 경로와 환경이름 설정하여 생성  

 `source py37/bin/activate` 입렵하여 가상환경 접속  
 `deactivate`   입력하여 빠져나올 수도 있음.

`pip install awscli` 설치

`aws configure` 입력 하여 `Access Key` 와 `Secret Access Key`
`ap-northeast-2``json` 값을 입력

키 값은 [AWS 사이트](https://aws.amazon.com/ko/?nc2=h_lg)에 접속하여 `IAM` 서비스 이용  
그룹생성 `AdministratorAccess` 정책 연결하여 생성  
사용자생성 엑세스 유형의 엑세스키 - 프로그래밍 방식 엑세스 체크하여 연결  

`cat ~/.aws/credentials` Key 값 확인 가능  
`cat ~/.aws/config` region , output 값 확인 가능

___


파이썬 3.3 버전 부터는 venv 이 기본 내장되어 있다고 해서 사용 해보려고 한다.  
디렉토리 명은 임의로 설정하여도 되지만  `.venv` 가 관행이니 지키는게 좋다.

```
$ cd <프로젝트 디렉터리>
$ python -m venv .venv
$ ls
.venv
```
가상 환경을 굳이 Git과 같은 소스 버전 관리 시스템에 올릴 필요는 없으므로 .venv 디렉터리를 .gitignore 파일에 추가해줍니다.  
`echo '.venv' >> .gitignore`

`bin/activate`를 실행하면 , 쉘 프롬프트 앞에 `(.venv)`라고 붙으면서 가상 환경이 활성화 된다. 
```
$ . .venv/bin/activate   
or
$ source .venv/bin/activate
(.venv) $
```


___

### Front-end

[머티리얼 디자인 라이트](https://getmdl.io/) 구글 오픈 소스 디자인 사이트 활용하여 UI 제작  

___

### S3 (Amazone Simple Storage Service)

S3 는 안전하고 내구성과 확장성이 뛰어난 객체 스토리지를 제공한다.  
사용한 스토리지에 대해서만 비용을 지불하며, 최소 요금이나 설치 비용은 없다.

1. 내구성
> 중요한 데이터를 저장할 수 있고 99.9% 의 객체 내구성을 보장한다고 한다. 데이터가 여러 시설과 디바이스에 중복 저장되어 있다.

2. 저렴한 비용
> 매우 저렴한 비용으로 대용량의 데이터를 저장할 수 있다. 수명 주기 관리를 사용하면 데이터가 오래됨에 따라 자동으로 마이그레이션 되어 비용을 절감할 수 있다.

3. 서비스 가능
> 99.9% 의 객체 가용성을 제공한다고 한다. 언제든지 원하는 때에 필요한 만큼 사용이 가능하다

4. 보안
> SSL 을 통해서 데이터 전송과 데이터 업로드 후 자동 암호화를 지원한다. 또한 `(IAM)` 을 사용하여 객체 권환을 관리하고 데이터에 대한 엑세스를 제어하는 **버킷 정책**을 구성할 수 있다.

사용방법  
버킷 이라는 저장 공간을 생성 해야 한다  

- 버킷이름은 유니크하게 생성해야 한다.
- 버킷 버전 관리 체크 해야 고급 설정에 있는 객체 잠금을 활성화 할 수 있다.

버킷 생성 후 이전에 작성하였던 front-end 파일들을 업로드 해준다.
이곳에 올라온 파일은 모든 같은 공간에 키값을 통해 저장되어 있다.

버킷정책을 이용한 권한설정

진행을 위해 퍼블릭 엑세스 차단 편집을 수정해야 한다.  
ACL 설정만 차단 활성화 해주고 버킷에 대한 엑세스는 차단을 허용해준다.  

버킷정책은 정책생성기를 클릭 하여 진행하며
```
Select Type of Policy : S3 Bucket Policy 
Principal : *
Actions : Get Object
ARN : (ARN)/*
```
설정하고 나오는 JSON 내용을 버킷 정책에 붙여넣기 해준다.

`속성` 에서 `정적 웹 사이트 호스팅` 을 설정하여 주소에 `/index.html` 을 관리 할 수 있다.  
하지만 이쪽으로 주소를 요청 할 때마다 요금이 부과 되기 때문에 `CloudFront` 를 활용하여 비용을 절감할 수 있다. 


### Dynamo DB
nosql 이다.




과정
index.html 을 포함한 프론트엔드 파일을 S3에 적재하여 호스팅을 하였고, 이 내용을 캐싱하기 위해 CloudFront를 매핑하였고
다이나모디비를 통해 테이블 생성, 람다와 람다함수를 연결해주는 SNS 설정하였음


람다 사용시 런타임 확인

![image](https://user-images.githubusercontent.com/79305451/137885006-25e7ea88-103f-4eab-b677-62d09c75ae38.png)


[boto3 도큐먼트](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html) 에 접속하여 Available Service 내의 DynamoDB 관련 문서 확인하여 테이블 리소스 사용법 확인하여 람다사용

![image](https://user-images.githubusercontent.com/79305451/137885223-a2b86cff-38fd-4efc-84bd-46cc5efdfe7d.png)



___

```def lambda_handler(event, context):```  
event 와 context 를 파라미터로 받는 함수를 실행하게 되어 있다.

코드를 수정하면 새로운 로그 스트림에 데이터가 쌓인다.

람다 사용시에는 "" 사용해야하함 '' 는 에러

Amazon API Gateway

 로깅, 엑세스제어, 모니터링, 인증 등을 통합적으로 관리 할 수 있다.  

 아마존 API 는 다음과 같은 제품이 있다.
 1. HTTP API
 2. REST API 
 3. WebSocket API
 으로 이루어져 있다.
