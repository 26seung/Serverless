# 서버리스 공부

### 서버리스 란?

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
> SSL 을 통해서 데이터 전송과 데이터 업로드 후 자동 암호화를 지원한다. 또한 `( IAM )` 을 사용하여 객체 권환을 관리하고 데이터에 대한 엑세스를 제어하는 **버킷 정책**을 구성할 수 있다.

사용방법  
버킷 이라는 저장 공간을 생성 해야 한다  

- 버킷이름은 유니크하게 생성해야 한다.
- 버킷 버전 관리 체크 해야 고급 설정에 있는 객체 잠금을 활성화 할 수 있다.

버킷 생성 후 이전에 작성하였던 front-end 파일들을 업로드 해준다.
이곳에 올라온 파일은 모든 같은 공간에 키값을 통해 저장되어 있다.

