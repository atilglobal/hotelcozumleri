const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+90|0)?[\s-]?[0-9]{3}[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;

export function validateEmail(value) {
  if (!value?.trim()) return "E-posta adresi gereklidir.";
  if (!emailRegex.test(value.trim())) return "Geçerli bir e-posta adresi girin.";
  return null;
}

export function validatePhone(value) {
  if (!value?.trim()) return "Telefon numarası gereklidir.";
  const cleaned = value.replace(/\s/g, "");
  if (!phoneRegex.test(cleaned) && cleaned.length < 10) {
    return "Geçerli bir telefon numarası girin.";
  }
  return null;
}

export function validatePassword(value) {
  if (!value || value.length < 8) return "Şifre en az 8 karakter olmalıdır.";
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
    return "Şifre en az bir harf ve bir rakam içermelidir.";
  }
  return null;
}

export function validateRequired(value, label) {
  if (!value?.trim()) return `${label} gereklidir.`;
  return null;
}

export function validateQuoteForm(data) {
  const errors = {};

  if (!data.solutions?.length) {
    errors.solutions = "En az bir çözüm seçmelisiniz.";
  }

  const hotelName = validateRequired(data.hotelName, "Otel adı");
  if (hotelName) errors.hotelName = hotelName;

  const city = validateRequired(data.city, "Şehir");
  if (city) errors.city = city;

  if (!data.roomCount?.trim()) {
    errors.roomCount = "Oda sayısı gereklidir.";
  }

  if (!data.hotelType) {
    errors.hotelType = "Otel türü seçmelisiniz.";
  }

  const fullName = validateRequired(data.fullName, "Ad soyad");
  if (fullName) errors.fullName = fullName;

  const phone = validatePhone(data.phone);
  if (phone) errors.phone = phone;

  const email = validateEmail(data.email);
  if (email) errors.email = email;

  if (!data.kvkkAccepted) {
    errors.kvkkAccepted = "KVKK metnini onaylamanız gerekmektedir.";
  }

  if (data.website) {
    errors.form = "Geçersiz gönderim.";
  }

  return errors;
}

export function validateContactForm(data) {
  const errors = {};

  const fullName = validateRequired(data.fullName, "Ad soyad");
  if (fullName) errors.fullName = fullName;

  const email = validateEmail(data.email);
  if (email) errors.email = email;

  const message = validateRequired(data.message, "Mesaj");
  if (message) errors.message = message;

  if (!data.kvkkAccepted) {
    errors.kvkkAccepted = "KVKK metnini onaylamanız gerekmektedir.";
  }

  if (data.website) {
    errors.form = "Geçersiz gönderim.";
  }

  return errors;
}
