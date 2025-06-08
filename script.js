document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const colorPicker = document.getElementById('colorPicker');
    const clearBtn = document.getElementById('clearBtn');
    const colorBtns = document.querySelectorAll('.color-btn');
    
    let isDrawing = false;
    let currentColor = '#000000';

    // 캔버스 생성 (32x32 그리드)
    for (let i = 0; i < 32 * 32; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        canvas.appendChild(pixel);
    }

    // 색상 선택기 이벤트
    colorPicker.addEventListener('input', (e) => {
        currentColor = e.target.value;
    });

    // 프리셋 색상 버튼 이벤트
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentColor = btn.style.backgroundColor;
            colorPicker.value = rgbToHex(btn.style.backgroundColor);
        });
    });

    // 지우기 버튼 이벤트
    clearBtn.addEventListener('click', () => {
        const pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => {
            pixel.style.backgroundColor = 'white';
        });
    });

    // 마우스 이벤트 처리
    canvas.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('pixel')) {
            isDrawing = true;
            e.target.style.backgroundColor = currentColor;
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing && e.target.classList.contains('pixel')) {
            e.target.style.backgroundColor = currentColor;
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });

    // RGB를 HEX로 변환하는 함수
    function rgbToHex(rgb) {
        // RGB 문자열에서 숫자만 추출
        const rgbValues = rgb.match(/\d+/g);
        if (!rgbValues) return '#000000';
        
        const r = parseInt(rgbValues[0]);
        const g = parseInt(rgbValues[1]);
        const b = parseInt(rgbValues[2]);
        
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
});
