FROM imoverlord/expo-turtle:latest

WORKDIR /app

ENV EXPO_ANDROID_KEYSTORE_PASSWORD *YOUR_KEYSTORE_PASSWORD*
ENV EXPO_ANDROID_KEY_PASSWORD *YOUR_KEY_PASSWORD*

COPY . .

RUN turtle build:android -u *YOUR_EXPO_USERNAME* -p *YOUR_EXPO_PASSWORD* --keystore-path ./AREA.jks --keystore-alias *YOUR_KEYSTORE_ALIAS* -t apk -o /build.apk