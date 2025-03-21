// 거주지 데이터
const addressData = {
    "서울특별시": ["종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"],
    "부산광역시": ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "강서구", "해운대구", "사하구", "금정구", "연제구", "수영구", "사상구", "기장군"],
    // ... 다른 도시들
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeAddressSelects();
    initializeFileUpload();
    setupFormValidation();
    setupInsuranceStatusChange();
});

// 거주지 선택 초기화
function initializeAddressSelects() {
    const citySelect = document.getElementById('citySelect');
    const districtSelect = document.getElementById('districtSelect');

    // 시/도 옵션 추가
    Object.keys(addressData).forEach(city => {
        const option = new Option(city, city);
        citySelect.add(option);
    });

    // 시/도 선택 시 구/군 업데이트
    citySelect.addEventListener('change', function() {
        const selectedCity = this.value;
        districtSelect.innerHTML = '<option value="">시/군/구 선택</option>';
        
        if (selectedCity && addressData[selectedCity]) {
            addressData[selectedCity].forEach(district => {
                const option = new Option(district, district);
                districtSelect.add(option);
            });
            districtSelect.disabled = false;
        } else {
            districtSelect.disabled = true;
        }
    });
}

// 파일 업로드 초기화
function initializeFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const maxFileSize = 50 * 1024 * 1024; // 50MB 제한

    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (file.size > maxFileSize) {
                alert(`${file.name}의 크기가 50MB를 초과합니다.`);
                return;
            }

            const reader = new FileReader();
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';

            reader.onload = function(e) {
                const preview = document.createElement(file.type.startsWith('video/') ? 'video' : 'img');
                preview.className = 'file-preview';
                preview.src = e.target.result;
                if (preview.tagName === 'VIDEO') {
                    preview.controls = true;
                }

                const info = document.createElement('div');
                info.className = 'file-info';
                info.textContent = file.name;

                const removeBtn = document.createElement('button');
                removeBtn.className = 'file-remove';
                removeBtn.innerHTML = '×';
                removeBtn.onclick = function() {
                    fileItem.remove();
                };

                fileItem.appendChild(preview);
                fileItem.appendChild(info);
                fileItem.appendChild(removeBtn);
                fileList.appendChild(fileItem);
            };

            reader.readAsDataURL(file);
        });
    });
}

// 보험 접수 상태에 따른 보험사 선택 표시/숨김
function setupInsuranceStatusChange() {
    const insuranceStatusInputs = document.getElementsByName('insuranceStatus');
    const insuranceCompanyGroup = document.getElementById('insuranceCompanyGroup');

    insuranceStatusInputs.forEach(input => {
        input.addEventListener('change', function() {
            insuranceCompanyGroup.style.display = this.value === '접수' ? 'block' : 'none';
            document.getElementById('insuranceCompany').required = this.value === '접수';
        });
    });
}

// 폼 검증 설정
function setupFormValidation() {
    const form = document.getElementById('consultationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // 폼 데이터 수집
        const formData = new FormData();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15);
        
        // 기본 정보 추가
        formData.append('consultationId', timestamp);
        formData.append('accidentType', document.getElementById('accidentType').value);
        formData.append('accidentDescription', document.getElementById('accidentDescription').value);
        formData.append('address', `${document.getElementById('citySelect').value} ${document.getElementById('districtSelect').value}`);
        formData.append('contactNumber', document.getElementById('contactNumber').value);
        formData.append('insuranceStatus', document.querySelector('input[name="insuranceStatus"]:checked').value);
        formData.append('diagnosis', document.getElementById('diagnosis').value);
        formData.append('question', document.getElementById('question').value);

        // 치료 상태 추가
        formData.append('treatment', document.querySelector('input[name="treatment"]').checked);
        formData.append('hospitalization', document.querySelector('input[name="hospitalization"]').checked);
        formData.append('surgery', document.querySelector('input[name="surgery"]').checked);

        // 보험사 정보 추가 (접수 상태인 경우)
        if (document.querySelector('input[name="insuranceStatus"]:checked').value === '접수') {
            formData.append('insuranceCompany', document.getElementById('insuranceCompany').value);
        }

        // 파일 데이터 추가
        const fileItems = document.querySelectorAll('.file-item img, .file-item video');
        fileItems.forEach((item, index) => {
            const base64Data = item.src;
            formData.append(`file${index}`, base64Data);
        });

        // 데이터 출력 (테스트용)
        console.log('상담 접수 데이터:', Object.fromEntries(formData));
        
        // TODO: Make 자동화 연동
        alert('상담이 접수되었습니다.');
        form.reset();
        document.getElementById('fileList').innerHTML = '';
    });
}

// 폼 검증
function validateForm() {
    const required = [
        { id: 'accidentType', message: '사고유형을 선택해주세요.' },
        { id: 'accidentDescription', message: '사고내용을 입력해주세요.' },
        { id: 'citySelect', message: '시/도를 선택해주세요.' },
        { id: 'districtSelect', message: '시/군/구를 선택해주세요.' },
        { id: 'contactNumber', message: '연락처를 입력해주세요.' },
        { id: 'diagnosis', message: '진단명을 입력해주세요.' },
        { id: 'question', message: '문의내용을 입력해주세요.' }
    ];

    // 필수 입력값 검증
    for (const field of required) {
        const element = document.getElementById(field.id);
        if (!element.value) {
            alert(field.message);
            element.focus();
            return false;
        }
    }

    // 보험접수 상태 검증
    if (!document.querySelector('input[name="insuranceStatus"]:checked')) {
        alert('보험접수 상태를 선택해주세요.');
        return false;
    }

    // 보험사 선택 검증 (접수 상태인 경우)
    if (document.querySelector('input[name="insuranceStatus"]:checked').value === '접수') {
        if (!document.getElementById('insuranceCompany').value) {
            alert('보험사를 선택해주세요.');
            return false;
        }
    }

    return true;
}