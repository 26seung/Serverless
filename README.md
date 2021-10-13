# 서버리스 공부

### 서버리스 란?

___
### 환경설정 준비

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

### Front-end

[머티리얼 디자인 라이트](https://getmdl.io/) 에 접속
