import React, { useEffect, useRef } from 'react';

const KakaoMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const center = new window.kakao.maps.LatLng(37.62218, 127.014268);
                const options = {
                    center: center,
                    level: 3,
                };
                const map = new window.kakao.maps.Map(mapRef.current, options);
                const mapMarker = new window.kakao.maps.Marker({
                    position: center,
                });
                map.setZoomable(false);
                mapMarker.setMap(map);
            });
        };
    }, []);

    return <div ref={mapRef} style={{ width: '500px', height: '400px' }}></div>;
};

export default KakaoMap;
