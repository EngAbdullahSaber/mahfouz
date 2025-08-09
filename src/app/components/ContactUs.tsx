"use client";
import React, { useState } from "react";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [focusedField, setFocusedField] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return value.trim().length < 2 ? "الاسم يجب أن يكون أكثر من حرفين" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "البريد الإلكتروني غير صحيح" : "";
      case "mobile":
        const phoneRegex = /^[0-9]{10,}$/;
        return !phoneRegex.test(value.replace(/\s/g, ""))
          ? "رقم الهاتف غير صحيح"
          : "";
      case "message":
        return value.trim().length < 10
          ? "الرسالة يجب أن تكون أكثر من 10 أحرف"
          : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setFocusedField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success/failure
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo

      if (isSuccess) {
        setSubmitStatus("success");
        setFormData({ fullName: "", email: "", mobile: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({
    icon: Icon,
    name,
    type,
    placeholder,
    isTextarea = false,
  }) => {
    const hasError = errors[name];
    const isFocused = focusedField === name;

    return (
      <div className="relative group">
        <div className={`relative ${isTextarea ? "h-32" : "h-14"}`}>
          <div
            className={`absolute right-4 ${
              isTextarea ? "top-4" : "top-1/2 -translate-y-1/2"
            } z-10 transition-colors duration-200 ${
              isFocused
                ? "text-blue-500"
                : hasError
                ? "text-red-500"
                : "text-gray-400"
            }`}
          >
            <Icon size={20} />
          </div>

          {isTextarea ? (
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              onFocus={() => setFocusedField(name)}
              onBlur={handleBlur}
              placeholder={placeholder}
              rows={4}
              className={`w-full h-full pr-12 pl-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-gray-300 resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-[1.02] ${
                hasError
                  ? "border-red-500 focus:border-red-400 focus:ring-red-500/20"
                  : isFocused
                  ? "border-blue-400 focus:border-blue-300 focus:ring-blue-500/20"
                  : "border-white/20 hover:border-white/30"
              }`}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              onFocus={() => setFocusedField(name)}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`w-full h-full pr-12 pl-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-[1.02] ${
                hasError
                  ? "border-red-500 focus:border-red-400 focus:ring-red-500/20"
                  : isFocused
                  ? "border-blue-400 focus:border-blue-300 focus:ring-blue-500/20"
                  : "border-white/20 hover:border-white/30"
              }`}
            />
          )}
        </div>

        {hasError && (
          <div className="mt-2 flex items-center text-red-400 text-sm animate-in slide-in-from-top-1 duration-300">
            <AlertCircle size={16} className="mr-2" />
            {hasError}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="contact-us"
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            تواصل معنا
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في تحقيق أفضل تجربة مع
            تطبيق باص واي
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Contact Form Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="space-y-8">
            {/* Contact Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-white font-medium text-sm">
                  الاسم الكامل
                </label>
                <InputField
                  icon={User}
                  name="fullName"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium text-sm">
                  البريد الإلكتروني
                </label>
                <InputField
                  icon={Mail}
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium text-sm">
                  رقم الهاتف
                </label>
                <InputField
                  icon={Phone}
                  name="mobile"
                  type="tel"
                  placeholder="05xxxxxxxx"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium text-sm">
                نص الرسالة
              </label>
              <InputField
                icon={MessageSquare}
                name="message"
                placeholder="اكتب رسالتك هنا..."
                isTextarea={true}
              />
            </div>

            {/* Submit Button and Status */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 min-w-[160px] justify-center ${
                  isSubmitting ? "animate-pulse" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin ml-2" />
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    <span>إرسال الرسالة</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus && (
                <div
                  className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-500 animate-in slide-in-from-right-5 ${
                    submitStatus === "success"
                      ? "bg-green-500/20 border border-green-500/30 text-green-300"
                      : "bg-red-500/20 border border-red-500/30 text-red-300"
                  }`}
                >
                  {submitStatus === "success" ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <span className="font-medium">
                        تم إرسال رسالتك بنجاح!
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-6 h-6 text-red-400" />
                      <span className="font-medium">
                        حدث خطأ، يرجى المحاولة مرة أخرى
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">البريد الإلكتروني</h3>
            <p className="text-gray-300">support@busway-sa.com</p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">الهاتف</h3>
            <p className="text-gray-300">+966 50 123 4567</p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">الدعم الفني</h3>
            <p className="text-gray-300">24/7 متاح دائماً</p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300">فريق الدعم متاح الآن</span>
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            متوسط وقت الاستجابة: أقل من ساعة واحدة
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
