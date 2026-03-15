let form = document.getElementById("registerForm")

let fullname = document.getElementById("fullname")
let email = document.getElementById("email")
let phone = document.getElementById("phone")
let password = document.getElementById("password")
let confirmPassword = document.getElementById("confirmPassword")
let terms = document.getElementById("terms")
let successMessage = document.getElementById("successMessage")

function showError(id,message){
    let error = document.getElementById(id + "Error")
    error.innerText = message
    error.classList.add("error")
}
function clearError(id){
    let error = document.getElementById(id + "Error")
    error.innerText = ""
}
function validateFullname(){
    let value = fullname.value.trim()
    let regex = /^[A-Za-zÀ-ỹ\s]+$/
    if(value === ""){
        showError("fullname","Không được để trống")
        return false
    }
    if(value.length < 3){
        showError("fullname","Phải ≥ 3 ký tự")
        return false
    }
    if(!regex.test(value)){
        showError("fullname","Chỉ chứa chữ cái và khoảng trắng")
        return false
    }
    clearError("fullname")
    return true
}
function validateEmail(){
    let value = email.value.trim()
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(value === ""){
        showError("email","Không được để trống")
        return false
    }
    if(!regex.test(value)){
        showError("email","Email không đúng định dạng")
        return false
    }
    clearError("email")
    return true
}
function validatePhone(){
    let value = phone.value.trim()
    let regex = /^0\d{9}$/
    if(value === ""){
        showError("phone","Không được để trống")
        return false
    }
    if(!regex.test(value)){
        showError("phone","Số điện thoại phải 10 số và bắt đầu bằng 0")
        return false
    }
    clearError("phone")
    return true
}
function validatePassword(){
    let value = password.value
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if(value === ""){
        showError("password","Không được để trống")
        return false
    }
    if(!regex.test(value)){
        showError("password","≥8 ký tự, có chữ hoa, chữ thường và số")
        return false
    }
    clearError("password")
    return true
}
function validateConfirmPassword(){
    let value = confirmPassword.value
    if(value === ""){
        showError("confirmPassword","Không được để trống")
        return false
    }
    if(value !== password.value){
        showError("confirmPassword","Mật khẩu không khớp")
        return false
    }
    clearError("confirmPassword")
    return true
}
function validateGender(){
    let gender = document.querySelector('input[name="gender"]:checked')
    if(!gender){
        showError("gender","Vui lòng chọn giới tính")
        return false
    }
    clearError("gender")
    return true
}
function validateTerms(){
    if(!terms.checked){
        showError("terms","Bạn phải đồng ý điều khoản")
        return false
    }
    clearError("terms")
    return true
}
fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirmPassword.addEventListener("blur",validateConfirmPassword)
fullname.addEventListener("input",function(){clearError("fullname")})
email.addEventListener("input",function(){clearError("email")})
phone.addEventListener("input",function(){clearError("phone")})
password.addEventListener("input",function(){clearError("password")})
confirmPassword.addEventListener("input",function(){clearError("confirmPassword")})
form.addEventListener("submit",function(e){
    e.preventDefault()
    let valid =
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirmPassword() &
        validateGender() &
        validateTerms()
    if(valid){
        form.style.display = "none"
        successMessage.innerText =
        "Đăng ký thành công! 🎉 Xin chào " + fullname.value
    }
})