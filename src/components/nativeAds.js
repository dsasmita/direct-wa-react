import React from 'react';
import {View, StyleSheet} from 'react-native';
import NativeAdView, {
  CallToActionView,
  IconView,
  HeadlineView,
  TaglineView,
  AdvertiserView,
} from 'react-native-admob-native-ads';

// test
// const NATIVE_AD_ID = 'ca-app-pub-3940256099942544/3986624511';

// production
const NATIVE_AD_ID = 'ca-app-pub-0124899135832986/4673626732';

const NativeAds = () => {
  const _onAdFailedToLoad = (event) => {
    console.log(event.nativeEvent);
  };

  const _onAdLoaded = (event) => {
    console.log(event);
    console.log('Ad has loaded');
  };

  return (
    <NativeAdView
      onAdLoaded={_onAdLoaded}
      onAdFailedToLoad={_onAdFailedToLoad}
      style={{
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
      }}
      adUnitID={NATIVE_AD_ID}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            height: 100,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <IconView
            style={{
              width: 60,
              height: 60,
            }}
          />
          <View
            style={{
              width: '60%',
              maxWidth: '60%',
              paddingHorizontal: 6,
            }}>
            <HeadlineView
              style={{
                fontWeight: 'bold',
                fontSize: 13,
              }}
            />
            <TaglineView
              numberOfLines={1}
              style={{
                fontSize: 11,
              }}
            />
            <AdvertiserView
              style={{
                fontSize: 10,
                color: 'gray',
              }}
            />
          </View>
          <CallToActionView
            style={{
              height: 45,
              paddingHorizontal: 12,
              backgroundColor: '#FFA300',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              elevation: 10,
            }}
            textStyle={{color: 'white', fontSize: 14}}
          />
        </View>
      </View>
    </NativeAdView>
  );
};

export default NativeAds;
