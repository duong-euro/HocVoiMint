/* ============================================
   HỌC VỚI MINT — Data Layer v2
   Profile, topics, lessons, questions, progress
   ============================================ */

const APP_DATA = {
  profile: {
    nickname: "",
    avatarColor: "#3B82F6",
    streak: 0,
    totalCompleted: 0,
    totalStarted: 0,
    todayCompleted: 0,
    todayCorrect: 0,
    todayTotal: 0,
    recentResults: [],
    badges: []
  },

  topics: [
    { id: "cong-tru", name: "Cộng và trừ", icon: "plus-minus", color: "#3B82F6", desc: "Phép cộng, trừ trong phạm vi 1000" },
    { id: "nhan-chia", name: "Nhân và chia", icon: "grid", color: "#8B5CF6", desc: "Bảng nhân 2-9, phép chia" },
    { id: "loi-van", name: "Toán có lời văn", icon: "book", color: "#10B981", desc: "Giải toán bằng lời văn đơn giản" },
    { id: "do-luong", name: "Đo lường", icon: "ruler", color: "#F59E0B", desc: "Độ dài, khối lượng, dung tích" },
    { id: "thoi-gian", name: "Thời gian", icon: "clock", color: "#EC4899", desc: "Xem đồng hồ, ngày tháng, giờ phút" },
    { id: "hinh-hoc", name: "Hình học", icon: "shapes", color: "#EF4444", desc: "Hình vuông, chữ nhật, chu vi, diện tích" },
    { id: "tong-hop", name: "Ôn tập tổng hợp", icon: "star", color: "#6366F1", desc: "Bài tập tổng hợp nhiều dạng" }
  ],

  lessons: [
    { id: "l01", topicId: "cong-tru", title: "Cộng trong phạm vi 1000", order: 1 },
    { id: "l02", topicId: "cong-tru", title: "Trừ trong phạm vi 1000", order: 2 },
    { id: "l03", topicId: "cong-tru", title: "Tìm thành phần chưa biết", order: 3 },
    { id: "l04", topicId: "nhan-chia", title: "Bảng nhân 2, 3, 4, 5", order: 1 },
    { id: "l05", topicId: "nhan-chia", title: "Bảng nhân 6, 7, 8, 9", order: 2 },
    { id: "l06", topicId: "nhan-chia", title: "Phép chia", order: 3 },
    { id: "l07", topicId: "loi-van", title: "Bài toán nhiều hơn, ít hơn", order: 1 },
    { id: "l08", topicId: "loi-van", title: "Bài toán gấp, giảm", order: 2 },
    { id: "l09", topicId: "do-luong", title: "Đo độ dài", order: 1 },
    { id: "l10", topicId: "do-luong", title: "Đo khối lượng, dung tích", order: 2 },
    { id: "l11", topicId: "thoi-gian", title: "Xem đồng hồ", order: 1 },
    { id: "l12", topicId: "thoi-gian", title: "Ngày, tháng, năm", order: 2 },
    { id: "l13", topicId: "hinh-hoc", title: "Chu vi hình", order: 1 },
    { id: "l14", topicId: "hinh-hoc", title: "Diện tích hình", order: 2 },
    { id: "l15", topicId: "tong-hop", title: "Ôn tập tổng hợp", order: 1 }
  ],

  exams: [
    { id: "e01", title: "Đề ôn học kỳ 1 — Đề 1", semester: 1, questionCount: 8, duration: 25 },
    { id: "e02", title: "Đề ôn học kỳ 1 — Đề 2", semester: 1, questionCount: 8, duration: 25 },
    { id: "e03", title: "Đề ôn học kỳ 1 — Đề 3", semester: 1, questionCount: 8, duration: 30 },
    { id: "e04", title: "Đề ôn học kỳ 2 — Đề 1", semester: 2, questionCount: 8, duration: 25 },
    { id: "e05", title: "Đề ôn học kỳ 2 — Đề 2", semester: 2, questionCount: 8, duration: 30 }
  ],

  questions: [
    // === CỘNG VÀ TRỪ ===
    { id: "q01", topicId: "cong-tru", lessonId: "l01", type: "input", difficulty: "easy", question: "345 + 123 = ?", correctAnswer: "468", explanation: "Cộng từng hàng: 5+3=8, 4+2=6, 3+1=4. Vậy 345 + 123 = 468.", hint: "Cộng hàng đơn vị trước, rồi hàng chục, rồi hàng trăm." },
    { id: "q02", topicId: "cong-tru", lessonId: "l01", type: "multiple-choice", difficulty: "easy", question: "256 + 144 = ?", options: ["390", "400", "410", "300"], correctAnswer: "400", explanation: "256 + 144 = 400. Cộng: 6+4=10 viết 0 nhớ 1.", hint: "Nhớ cộng số nhớ vào hàng tiếp theo." },
    { id: "q03", topicId: "cong-tru", lessonId: "l01", type: "input", difficulty: "medium", question: "475 + 325 = ?", correctAnswer: "800", explanation: "475 + 325 = 800.", hint: "5+5=10, nhớ 1. 7+2+1=10, nhớ 1." },
    { id: "q04", topicId: "cong-tru", lessonId: "l01", type: "multiple-choice", difficulty: "hard", question: "199 + 201 = ?", options: ["300", "400", "398", "401"], correctAnswer: "400", explanation: "199 + 201 = 400. Mẹo: 200 + 200 = 400.", hint: "Thử làm tròn: 199 gần 200, 201 gần 200." },
    { id: "q05", topicId: "cong-tru", lessonId: "l02", type: "input", difficulty: "easy", question: "567 - 234 = ?", correctAnswer: "333", explanation: "Trừ từng hàng: 7-4=3, 6-3=3, 5-2=3.", hint: "Trừ hàng đơn vị trước." },
    { id: "q06", topicId: "cong-tru", lessonId: "l02", type: "multiple-choice", difficulty: "medium", question: "800 - 356 = ?", options: ["454", "444", "544", "434"], correctAnswer: "444", explanation: "800 - 356 = 444.", hint: "Mượn từ hàng trăm khi hàng đơn vị không đủ trừ." },
    { id: "q07", topicId: "cong-tru", lessonId: "l02", type: "input", difficulty: "hard", question: "1000 - 537 = ?", correctAnswer: "463", explanation: "1000 - 537 = 463.", hint: "1000 - 500 = 500, rồi trừ tiếp 37." },
    { id: "q08", topicId: "cong-tru", lessonId: "l03", type: "input", difficulty: "easy", question: "x + 235 = 600. Tìm x.", correctAnswer: "365", explanation: "x = 600 - 235 = 365. Muốn tìm số hạng, lấy tổng trừ số hạng kia.", hint: "Muốn tìm x, lấy 600 trừ đi 235." },
    { id: "q09", topicId: "cong-tru", lessonId: "l03", type: "multiple-choice", difficulty: "medium", question: "x - 148 = 252. Tìm x.", options: ["400", "104", "300", "390"], correctAnswer: "400", explanation: "x = 252 + 148 = 400.", hint: "Muốn tìm số bị trừ, lấy hiệu cộng số trừ." },
    { id: "q10", topicId: "cong-tru", lessonId: "l03", type: "input", difficulty: "hard", question: "450 - x = 120. Tìm x.", correctAnswer: "330", explanation: "x = 450 - 120 = 330.", hint: "Muốn tìm số trừ, lấy số bị trừ trừ hiệu." },

    // === NHÂN VÀ CHIA ===
    { id: "q11", topicId: "nhan-chia", lessonId: "l04", type: "input", difficulty: "easy", question: "3 x 7 = ?", correctAnswer: "21", explanation: "3 x 7 = 21 (bảng nhân 3).", hint: "Đếm 3 lần 7: 7, 14, 21." },
    { id: "q12", topicId: "nhan-chia", lessonId: "l04", type: "multiple-choice", difficulty: "easy", question: "5 x 6 = ?", options: ["25", "30", "35", "36"], correctAnswer: "30", explanation: "5 x 6 = 30.", hint: "5 nhân mấy cũng tận cùng bằng 0 hoặc 5." },
    { id: "q13", topicId: "nhan-chia", lessonId: "l04", type: "input", difficulty: "medium", question: "4 x 8 = ?", correctAnswer: "32", explanation: "4 x 8 = 32.", hint: "4 x 8 = 4 x 4 x 2 = 16 x 2." },
    { id: "q14", topicId: "nhan-chia", lessonId: "l05", type: "input", difficulty: "easy", question: "6 x 7 = ?", correctAnswer: "42", explanation: "6 x 7 = 42.", hint: "6 x 7 = 6 x 5 + 6 x 2 = 30 + 12." },
    { id: "q15", topicId: "nhan-chia", lessonId: "l05", type: "multiple-choice", difficulty: "medium", question: "7 x 8 = ?", options: ["54", "56", "48", "63"], correctAnswer: "56", explanation: "7 x 8 = 56.", hint: "7 x 8 = 7 x 4 x 2 = 28 x 2." },
    { id: "q16", topicId: "nhan-chia", lessonId: "l05", type: "input", difficulty: "hard", question: "9 x 9 = ?", correctAnswer: "81", explanation: "9 x 9 = 81.", hint: "9 x 9 = 9 x 10 - 9 = 90 - 9." },
    { id: "q17", topicId: "nhan-chia", lessonId: "l06", type: "multiple-choice", difficulty: "easy", question: "24 : 4 = ?", options: ["5", "6", "7", "8"], correctAnswer: "6", explanation: "24 : 4 = 6. Vì 4 x 6 = 24.", hint: "4 nhân mấy bằng 24?" },
    { id: "q18", topicId: "nhan-chia", lessonId: "l06", type: "input", difficulty: "medium", question: "63 : 7 = ?", correctAnswer: "9", explanation: "63 : 7 = 9. Vì 7 x 9 = 63.", hint: "7 nhân mấy bằng 63?" },
    { id: "q19", topicId: "nhan-chia", lessonId: "l06", type: "multiple-choice", difficulty: "hard", question: "72 : 8 = ?", options: ["7", "8", "9", "6"], correctAnswer: "9", explanation: "72 : 8 = 9. Vì 8 x 9 = 72.", hint: "8 nhân mấy bằng 72?" },

    // === TOÁN CÓ LỜI VĂN ===
    { id: "q20", topicId: "loi-van", lessonId: "l07", type: "input", difficulty: "easy", question: "Lan có 45 viên bi, Hoa có nhiều hơn Lan 18 viên. Hỏi Hoa có bao nhiêu viên bi?", correctAnswer: "63", explanation: "Hoa có: 45 + 18 = 63 viên bi.", hint: "Nhiều hơn nghĩa là cộng thêm." },
    { id: "q21", topicId: "loi-van", lessonId: "l07", type: "multiple-choice", difficulty: "medium", question: "Thùng thứ nhất có 320 kg gạo, thùng thứ hai ít hơn 75 kg. Thùng thứ hai có bao nhiêu kg?", options: ["395", "255", "245", "235"], correctAnswer: "245", explanation: "Thùng 2: 320 - 75 = 245 kg.", hint: "Ít hơn nghĩa là trừ đi." },
    { id: "q22", topicId: "loi-van", lessonId: "l08", type: "input", difficulty: "easy", question: "Mẹ có 8 quả cam, con có gấp 3 lần. Con có bao nhiêu quả?", correctAnswer: "24", explanation: "Con có: 8 x 3 = 24 quả.", hint: "Gấp 3 lần nghĩa là nhân 3." },
    { id: "q23", topicId: "loi-van", lessonId: "l08", type: "multiple-choice", difficulty: "medium", question: "42 cái kẹo chia đều cho 6 bạn. Mỗi bạn được mấy cái?", options: ["6", "7", "8", "9"], correctAnswer: "7", explanation: "Mỗi bạn: 42 : 6 = 7 cái.", hint: "Chia đều nghĩa là phép chia." },
    { id: "q24", topicId: "loi-van", lessonId: "l08", type: "input", difficulty: "hard", question: "Mẹ mua 5 quyển vở, mỗi quyển 8 nghìn đồng. Mẹ trả bao nhiêu nghìn đồng?", correctAnswer: "40", explanation: "Mẹ trả: 5 x 8 = 40 nghìn đồng.", hint: "Mua nhiều quyển cùng giá thì nhân." },

    // === ĐO LƯỜNG ===
    { id: "q25", topicId: "do-luong", lessonId: "l09", type: "multiple-choice", difficulty: "easy", question: "1 m = ? cm", options: ["10", "100", "1000", "50"], correctAnswer: "100", explanation: "1 m = 100 cm.", hint: "Mét lớn hơn xen-ti-mét 100 lần." },
    { id: "q26", topicId: "do-luong", lessonId: "l09", type: "input", difficulty: "medium", question: "3 km = ? m", correctAnswer: "3000", explanation: "1 km = 1000 m, nên 3 km = 3000 m.", hint: "1 km = 1000 m." },
    { id: "q27", topicId: "do-luong", lessonId: "l10", type: "multiple-choice", difficulty: "easy", question: "1 kg = ? g", options: ["10", "100", "1000", "500"], correctAnswer: "1000", explanation: "1 kg = 1000 g.", hint: "Ki-lô-gam lớn hơn gam 1000 lần." },
    { id: "q28", topicId: "do-luong", lessonId: "l10", type: "input", difficulty: "medium", question: "2 lít = ? ml", correctAnswer: "2000", explanation: "1 lít = 1000 ml, nên 2 lít = 2000 ml.", hint: "1 lít = 1000 mi-li-lít." },

    // === THỜI GIAN ===
    { id: "q29", topicId: "thoi-gian", lessonId: "l11", type: "multiple-choice", difficulty: "easy", question: "Kim ngắn chỉ 3, kim dài chỉ 12. Mấy giờ?", options: ["12 giờ", "3 giờ", "3 giờ 12 phút", "12 giờ 3 phút"], correctAnswer: "3 giờ", explanation: "Kim ngắn chỉ giờ, kim dài ở 12 là đúng giờ. Vậy là 3 giờ.", hint: "Kim ngắn chỉ giờ, kim dài chỉ phút." },
    { id: "q30", topicId: "thoi-gian", lessonId: "l11", type: "input", difficulty: "easy", question: "1 giờ = ? phút", correctAnswer: "60", explanation: "1 giờ = 60 phút.", hint: "Một giờ có 60 phút." },
    { id: "q31", topicId: "thoi-gian", lessonId: "l12", type: "multiple-choice", difficulty: "medium", question: "Tháng 2 (năm không nhuận) có bao nhiêu ngày?", options: ["28", "29", "30", "31"], correctAnswer: "28", explanation: "Tháng 2 năm không nhuận có 28 ngày.", hint: "Tháng 2 là tháng ngắn nhất." },
    { id: "q32", topicId: "thoi-gian", lessonId: "l12", type: "input", difficulty: "easy", question: "1 ngày = ? giờ", correctAnswer: "24", explanation: "1 ngày = 24 giờ.", hint: "Một ngày có 24 giờ." },

    // === HÌNH HỌC ===
    { id: "q33", topicId: "hinh-hoc", lessonId: "l13", type: "multiple-choice", difficulty: "easy", question: "Hình vuông cạnh 5 cm. Chu vi là?", options: ["15 cm", "20 cm", "25 cm", "10 cm"], correctAnswer: "20 cm", explanation: "Chu vi hình vuông = 4 x cạnh = 4 x 5 = 20 cm.", hint: "Chu vi hình vuông = 4 nhân cạnh." },
    { id: "q34", topicId: "hinh-hoc", lessonId: "l13", type: "input", difficulty: "medium", question: "Hình chữ nhật dài 8 cm, rộng 3 cm. Chu vi là bao nhiêu cm?", correctAnswer: "22", explanation: "Chu vi = (8 + 3) x 2 = 22 cm.", hint: "Chu vi HCN = (dài + rộng) x 2." },
    { id: "q35", topicId: "hinh-hoc", lessonId: "l14", type: "multiple-choice", difficulty: "easy", question: "Diện tích hình vuông cạnh 6 cm là?", options: ["24 cm²", "36 cm²", "12 cm²", "30 cm²"], correctAnswer: "36 cm²", explanation: "Diện tích = 6 x 6 = 36 cm².", hint: "Diện tích hình vuông = cạnh nhân cạnh." },
    { id: "q36", topicId: "hinh-hoc", lessonId: "l14", type: "input", difficulty: "medium", question: "Hình chữ nhật dài 9 cm, rộng 4 cm. Diện tích là bao nhiêu cm²?", correctAnswer: "36", explanation: "Diện tích = 9 x 4 = 36 cm².", hint: "Diện tích HCN = dài nhân rộng." },

    // === TỔNG HỢP ===
    { id: "q37", topicId: "tong-hop", lessonId: "l15", type: "input", difficulty: "easy", question: "456 + 327 = ?", correctAnswer: "783", explanation: "456 + 327 = 783.", hint: "Cộng từng hàng từ phải sang trái." },
    { id: "q38", topicId: "tong-hop", lessonId: "l15", type: "multiple-choice", difficulty: "medium", question: "7 x 8 = ?", options: ["54", "56", "48", "64"], correctAnswer: "56", explanation: "7 x 8 = 56.", hint: "Tra bảng nhân 7." },
    { id: "q39", topicId: "tong-hop", lessonId: "l15", type: "input", difficulty: "medium", question: "Chu vi hình vuông cạnh 8 cm?", correctAnswer: "32", explanation: "Chu vi = 4 x 8 = 32 cm.", hint: "Chu vi hình vuông = 4 nhân cạnh." },
    { id: "q40", topicId: "tong-hop", lessonId: "l15", type: "multiple-choice", difficulty: "hard", question: "Số liền sau của 899 là?", options: ["898", "900", "890", "901"], correctAnswer: "900", explanation: "Số liền sau của 899 là 900.", hint: "Liền sau nghĩa là cộng thêm 1." },

    // === THÊM CÂU CHO ĐỀ ÔN THI ===
    { id: "q41", topicId: "cong-tru", lessonId: "l01", type: "input", difficulty: "easy", question: "Số liền trước của 500 là?", correctAnswer: "499", explanation: "Số liền trước của 500 là 499.", hint: "Liền trước nghĩa là trừ đi 1." },
    { id: "q42", topicId: "nhan-chia", lessonId: "l04", type: "multiple-choice", difficulty: "easy", question: "2 x 9 = ?", options: ["16", "18", "20", "14"], correctAnswer: "18", explanation: "2 x 9 = 18.", hint: "Đếm 2 lần 9." },
    { id: "q43", topicId: "nhan-chia", lessonId: "l05", type: "input", difficulty: "medium", question: "8 x 6 = ?", correctAnswer: "48", explanation: "8 x 6 = 48.", hint: "8 x 6 = 8 x 5 + 8 = 40 + 8." },
    { id: "q44", topicId: "hinh-hoc", lessonId: "l13", type: "input", difficulty: "hard", question: "Hình vuông chu vi 36 cm. Cạnh là bao nhiêu cm?", correctAnswer: "9", explanation: "Cạnh = 36 : 4 = 9 cm.", hint: "Cạnh = chu vi chia 4." },
    { id: "q45", topicId: "do-luong", lessonId: "l09", type: "multiple-choice", difficulty: "medium", question: "5 dm = ? cm", options: ["5", "50", "500", "55"], correctAnswer: "50", explanation: "1 dm = 10 cm, nên 5 dm = 50 cm.", hint: "1 dm = 10 cm." },
    { id: "q46", topicId: "loi-van", lessonId: "l07", type: "input", difficulty: "easy", question: "Em có 250 quyển vở, anh có ít hơn em 85 quyển. Anh có bao nhiêu quyển?", correctAnswer: "165", explanation: "Anh có: 250 - 85 = 165 quyển.", hint: "Ít hơn thì trừ đi." },
    { id: "q47", topicId: "cong-tru", lessonId: "l02", type: "multiple-choice", difficulty: "easy", question: "700 - 356 = ?", options: ["344", "354", "346", "334"], correctAnswer: "344", explanation: "700 - 356 = 344.", hint: "Mượn từ hàng trăm." },
    { id: "q48", topicId: "thoi-gian", lessonId: "l11", type: "multiple-choice", difficulty: "medium", question: "8 giờ 30 phút còn gọi là?", options: ["8 giờ rưỡi", "8 giờ kém 30", "9 giờ 30", "7 giờ rưỡi"], correctAnswer: "8 giờ rưỡi", explanation: "8 giờ 30 phút = 8 giờ rưỡi.", hint: "30 phút = nửa giờ = rưỡi." }
  ]
};

// Exam question sets — IDs of questions for each exam
APP_DATA.examQuestions = {
  "e01": ["q01","q05","q11","q17","q20","q25","q33","q41"],
  "e02": ["q02","q06","q12","q18","q21","q29","q34","q42"],
  "e03": ["q03","q08","q13","q22","q26","q30","q35","q37"],
  "e04": ["q04","q07","q14","q23","q27","q31","q36","q38"],
  "e05": ["q09","q10","q15","q16","q19","q24","q28","q39"]
};
