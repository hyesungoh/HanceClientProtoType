<div align=center>

<h1> 
<img width="150px" src="https://user-images.githubusercontent.com/26461307/127677346-8bb6ca31-1d6c-4786-92d0-95ed98b15f0e.png"/> <br/>
Wavy Client Prototype </h1>

<p>testing real-time pose detection and similarity evaluation</p>
</div>

<div align="center">
  <a href="#packages">Packages</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#developer">Developer</a>
</div>

## Introduction

<div align="left">

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>

<img src="https://img.shields.io/badge/Tensorflow.js-FF6F00?style=flat-square&logo=TensorFlow&logoColor=white"/>

<img src="https://img.shields.io/badge/MaterialUI-0081CB?style=flat-square&logo=Material-UI&logoColor=white"/>

<img src="https://img.shields.io/badge/StyledComponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

</div>

댄스 코칭 서비스 개발을 위해 **실시간 분석**, **분석 결과 보기**, **원하는 영상 배우기** 기능을 Prototyping 하였습니다.

## Features

<div align="center">

<img width="700" alt="realtime" src="https://user-images.githubusercontent.com/26461307/128743077-d18d7f84-8699-478e-ab39-4bf5568952a5.png">

</div>

#### 실시간 분석

|                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="700" alt="realtime" src="https://user-images.githubusercontent.com/26461307/128743077-d18d7f84-8699-478e-ab39-4bf5568952a5.png"> | - `Tensorflow.js`와 `posenet`을 이용하여 사용자 웹캠의 모션 정보를 실시간으로 추출한 후, 웹캠 위에 스켈레톤을 그려줍니다. <br/> - 실시간으로 추출한 데이터를 이용하여 미리 추출된 `학습용 영상`의 데이터와 유사도 비교 알고리즘을 수행한 후, 그에 대한 정보를 `텍스트`와 `게이지바`를 이용하여 보여줍니다. <br/> - posenet의 Architecture, Output Stride, 감지되는 시간, input 해상도와 스켈레톤 설정 값, 동영상 재생 시간을 조절할 수 있도록 개발하여 프로토타이핑에 최적화하였습니다. |

-   `Tensorflow.js`와 `posenet`을 이용하여 사용자 웹캠의 모션 정보를 실시간으로 추출한 후, 웹캠 위에 스켈레톤을 그려줍니다.
-   실시간으로 추출한 데이터를 이용하여 미리 추출된 `학습용 영상`의 데이터와 유사도 비교 알고리즘을 수행한 후, 그에 대한 정보를 `텍스트`와 `게이지바`를 이용하여 보여줍니다.
-   posenet의 Architecture, Output Stride, 감지되는 시간, input 해상도와 스켈레톤 설정 값, 동영상 재생 시간을 조절할 수 있도록 개발하여 프로토타이핑에 최적화하였습니다.

<hr/>

<div align="center">

<img width="700" alt="analysis" src="https://user-images.githubusercontent.com/26461307/128743083-45c2288d-5e8f-47dc-aac8-9ca6c5cc7266.png">

</div>

#### 분석 결과 보기

-   `Youtube 임베드` 영상과 `사용자가 전에 췄던 영상`을 하나의 컨트롤러로 시간대 이동, 시작/중지 할 수 있습니다.
-   따라하기 버튼을 클릭 시 사용자가 전에 췄던 영상의 크기와 투명도를 조절한 후, 사용자 웹캠을 보여줍니다.
-   컨트롤러를 이동할 때만 보여지는 유투브 영상을 이용해 컨트롤러에서 이동한 시간대의 화면을 미리 볼 수 있도록 하였습니다.

<hr/>

<div align="center">

<img width="700" alt="youtube" src="https://user-images.githubusercontent.com/26461307/128743095-0c7c1432-207f-4e2a-a50b-b0a8e7533d82.jpeg">

</div>

#### 원하는 영상 배우기

-   Youtube 영상의 url을 입력한 후, 해당 영상과 사용자 웹캠을 같이 보여줍니다.

## Packages

-   react@17.0.2
-   react-router-dom@5.2.0
-   recoil@0.3.1
-   styled-components@5.3.0
-   react-webcam@5.2.4
-   react-player@2.9.0
-   @material-ui/core@4.12.2
-   @tensorflow/tfjs@3.7.0
-   @tensorflow-models/posenet@2.2.2
-   @types/dom-mediacapture-record@1.0.10

## Getting Started

```bash
# clone this repo
cd prototypefrontend
npm install # or yarn
npm start
```

## Developer

This project was supported by Software Maestro

<div align="left">

 <img src="https://avatars.githubusercontent.com/u/20268101?v=4" width="70px" style="border-radius:50%" />

 <img src="https://avatars.githubusercontent.com/u/26461307?v=4" width="70px" style="border-radius:50%" />

 <img src="https://avatars.githubusercontent.com/u/61102178?v=4" width="70px" style="border-radius:50%" />

</div>

AI : [haeseoklee](https://github.com/haeseoklee) • FE [hyesungoh](https://github.com/hyesungoh) • BE [Yeonwu](https://github.com/Yeonwu)
