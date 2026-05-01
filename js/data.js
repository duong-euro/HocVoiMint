/* ============================================
   VUI HỌC TOÁN 3 — Data Layer
   Dữ liệu mẫu: topics, lessons, exams, questions
   ============================================ */

const TOPICS = [
  {
    id: "so-phep-tinh",
    name: "Số và phép tính",
    desc: "Ôn tập các số đến 1000, cộng trừ có nhớ",
    icon: "calculator",
    color: "#2563EB",
    lessonCount: 3,
    semester: null
  },
  {
    id: "bang-nhan-chia",
    name: "Bảng nhân chia",
    desc: "Bảng nhân 2-9, phép chia tương ứng",
    icon: "grid",
    color: "#7C3AED",
    lessonCount: 2,
    semester: null
  },
  {
    id: "hinh-hoc",
    name: "Hình học",
    desc: "Hình vuông, hình chữ nhật, chu vi, diện tích",
    icon: "shapes",
    color: "#EC4899",
    lessonCount: 2,
    semester: null
  },
  {
    id: "do-luong",
    name: "Đo lường và thời gian",
    desc: "Đơn vị đo độ dài, khối lượng, xem đồng hồ",
    icon: "ruler",
    color: "#F59E0B",
    lessonCount: 2,
    semester: null
  },
  {
    id: "toan-loi-van",
    name: "Toán có lời văn",
    desc: "Giải toán bằng phép tính, bài toán thực tế",
    icon: "book",
    color: "#22C55E",
    lessonCount: 2,
    semester: null
  },
  {
    id: "on-tap-tong-hop",
    name: "Ôn tập tổng hợp",
    desc: "Bài tập tổng hợp nhiều dạng kiến thức",
    icon: "star",
    color: "#EF4444",
    lessonCount: 1,
    semester: null
  }
];

const LESSONS = [
  // --- Số và phép tính ---
  { id: "l01", topicId: "so-phep-tinh", title: "Số liền trước, liền sau", difficulty: "easy", questionCount: 6, semester: 1 },
  { id: "l02", topicId: "so-phep-tinh", title: "Cộng trừ trong phạm vi 1000", difficulty: "medium", questionCount: 7, semester: 1 },
  { id: "l03", topicId: "so-phep-tinh", title: "Tìm thành phần chưa biết", difficulty: "hard", questionCount: 6, semester: 1 },
  // --- Bảng nhân chia ---
  { id: "l04", topicId: "bang-nhan-chia", title: "Bảng nhân 2, 3, 4, 5", difficulty: "easy", questionCount: 8, semester: 1 },
  { id: "l05", topicId: "bang-nhan-chia", title: "Bảng nhân 6, 7, 8, 9", difficulty: "medium", questionCount: 7, semester: 2 },
  // --- Hình học ---
  { id: "l06", topicId: "hinh-hoc", title: "Nhận biết hình, tính chu vi", difficulty: "easy", questionCount: 6, semester: 1 },
  { id: "l07", topicId: "hinh-hoc", title: "Diện tích hình chữ nhật, hình vuông", difficulty: "medium", questionCount: 6, semester: 2 },
  // --- Đo lường và thời gian ---
  { id: "l08", topicId: "do-luong", title: "Đơn vị đo độ dài (mm, cm, dm, m, km)", difficulty: "easy", questionCount: 6, semester: 1 },
  { id: "l09", topicId: "do-luong", title: "Xem đồng hồ, ngày tháng", difficulty: "medium", questionCount: 6, semester: 2 },
  // --- Toán có lời văn ---
  { id: "l10", topicId: "toan-loi-van", title: "Bài toán về nhiều hơn, ít hơn", difficulty: "easy", questionCount: 6, semester: 1 },
  { id: "l11", topicId: "toan-loi-van", title: "Bài toán về gấp, giảm", difficulty: "medium", questionCount: 6, semester: 2 },
  // --- Ôn tập tổng hợp ---
  { id: "l12", topicId: "on-tap-tong-hop", title: "Ôn tập tổng hợp các dạng", difficulty: "hard", questionCount: 8, semester: null }
];

const EXAMS = [
  { id: "e01", title: "Đề ôn học kỳ 1 - Đề số 1", semester: 1, questionCount: 8, duration: "30 phút" },
  { id: "e02", title: "Đề ôn học kỳ 1 - Đề số 2", semester: 1, questionCount: 7, duration: "30 phút" },
  { id: "e03", title: "Đề ôn học kỳ 1 - Đề số 3", semester: 1, questionCount: 8, duration: "35 phút" },
  { id: "e04", title: "Đề ôn học kỳ 2 - Đề số 1", semester: 2, questionCount: 8, duration: "30 phút" },
  { id: "e05", title: "Đề ôn học kỳ 2 - Đề số 2", semester: 2, questionCount: 7, duration: "35 phút" },
  { id: "e06", title: "Đề ôn học kỳ 2 - Đề số 3", semester: 2, questionCount: 8, duration: "35 phút" }
];

const QUESTIONS = {
  // ===== LESSON: Số liền trước, liền sau =====
  "l01": [
    { type: "multiple_choice", text: "Số liền sau của 499 là số nào?", choices: ["498", "500", "501", "489"], answer: 1, explain: "Số liền sau của 499 là 499 + 1 = 500." },
    { type: "input_number", text: "Số liền trước của 700 là bao nhiêu?", answer: 699, explain: "Số liền trước của 700 là 700 - 1 = 699." },
    { type: "multiple_choice", text: "Số liền trước của 1000 là số nào?", choices: ["999", "1001", "990", "900"], answer: 0, explain: "Số liền trước của 1000 là 1000 - 1 = 999." },
    { type: "input_number", text: "Số liền sau của 359 là bao nhiêu?", answer: 360, explain: "Số liền sau của 359 là 359 + 1 = 360." },
    { type: "multiple_choice", text: "Các số 456, 457, ... , 459. Số còn thiếu là?", choices: ["455", "460", "458", "450"], answer: 2, explain: "Dãy số liên tiếp: 456, 457, 458, 459." },
    { type: "input_number", text: "Số liền trước của 200 là bao nhiêu?", answer: 199, explain: "Số liền trước của 200 là 200 - 1 = 199." }
  ],

  // ===== LESSON: Cộng trừ trong phạm vi 1000 =====
  "l02": [
    { type: "input_number", text: "345 + 123 = ?", answer: 468, explain: "345 + 123 = 468. Cộng từng hàng: 5+3=8, 4+2=6, 3+1=4." },
    { type: "multiple_choice", text: "567 - 234 = ?", choices: ["333", "323", "343", "313"], answer: 0, explain: "567 - 234 = 333. Trừ từng hàng: 7-4=3, 6-3=3, 5-2=3." },
    { type: "input_number", text: "256 + 144 = ?", answer: 400, explain: "256 + 144 = 400. Cộng: 6+4=10 viết 0 nhớ 1, 5+4+1=10 viết 0 nhớ 1, 2+1+1=4." },
    { type: "multiple_choice", text: "800 - 356 = ?", choices: ["454", "444", "544", "434"], answer: 1, explain: "800 - 356 = 444." },
    { type: "input_number", text: "199 + 201 = ?", answer: 400, explain: "199 + 201 = 400." },
    { type: "multiple_choice", text: "Tổng của 475 và 325 là bao nhiêu?", choices: ["700", "800", "750", "850"], answer: 1, explain: "475 + 325 = 800." },
    { type: "input_number", text: "1000 - 537 = ?", answer: 463, explain: "1000 - 537 = 463." }
  ],

  // ===== LESSON: Tìm thành phần chưa biết =====
  "l03": [
    { type: "input_number", text: "x + 235 = 600. Tìm x.", answer: 365, explain: "x = 600 - 235 = 365. Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết." },
    { type: "multiple_choice", text: "x - 148 = 252. Tìm x.", choices: ["400", "104", "300", "390"], answer: 0, explain: "x = 252 + 148 = 400. Muốn tìm số bị trừ, ta lấy hiệu cộng số trừ." },
    { type: "input_number", text: "450 - x = 120. Tìm x.", answer: 330, explain: "x = 450 - 120 = 330. Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu." },
    { type: "multiple_choice", text: "x + 175 = 500. Tìm x.", choices: ["325", "335", "675", "315"], answer: 0, explain: "x = 500 - 175 = 325." },
    { type: "input_number", text: "x - 99 = 401. Tìm x.", answer: 500, explain: "x = 401 + 99 = 500." },
    { type: "input_number", text: "300 + x = 750. Tìm x.", answer: 450, explain: "x = 750 - 300 = 450." }
  ],

  // ===== LESSON: Bảng nhân 2, 3, 4, 5 =====
  "l04": [
    { type: "input_number", text: "3 x 7 = ?", answer: 21, explain: "3 x 7 = 21 (bảng nhân 3)." },
    { type: "multiple_choice", text: "5 x 6 = ?", choices: ["25", "30", "35", "36"], answer: 1, explain: "5 x 6 = 30 (bảng nhân 5)." },
    { type: "input_number", text: "4 x 8 = ?", answer: 32, explain: "4 x 8 = 32 (bảng nhân 4)." },
    { type: "multiple_choice", text: "2 x 9 = ?", choices: ["16", "18", "20", "14"], answer: 1, explain: "2 x 9 = 18 (bảng nhân 2)." },
    { type: "input_number", text: "5 x 5 = ?", answer: 25, explain: "5 x 5 = 25 (bảng nhân 5)." },
    { type: "multiple_choice", text: "3 x 9 = ?", choices: ["24", "27", "21", "30"], answer: 1, explain: "3 x 9 = 27 (bảng nhân 3)." },
    { type: "input_number", text: "4 x 6 = ?", answer: 24, explain: "4 x 6 = 24 (bảng nhân 4)." },
    { type: "multiple_choice", text: "24 : 4 = ?", choices: ["5", "6", "7", "8"], answer: 1, explain: "24 : 4 = 6. Vì 4 x 6 = 24." }
  ],

  // ===== LESSON: Bảng nhân 6, 7, 8, 9 =====
  "l05": [
    { type: "input_number", text: "6 x 7 = ?", answer: 42, explain: "6 x 7 = 42 (bảng nhân 6)." },
    { type: "multiple_choice", text: "7 x 8 = ?", choices: ["54", "56", "48", "63"], answer: 1, explain: "7 x 8 = 56 (bảng nhân 7)." },
    { type: "input_number", text: "8 x 6 = ?", answer: 48, explain: "8 x 6 = 48 (bảng nhân 8)." },
    { type: "multiple_choice", text: "9 x 4 = ?", choices: ["32", "36", "40", "45"], answer: 1, explain: "9 x 4 = 36 (bảng nhân 9)." },
    { type: "input_number", text: "63 : 7 = ?", answer: 9, explain: "63 : 7 = 9. Vì 7 x 9 = 63." },
    { type: "multiple_choice", text: "72 : 8 = ?", choices: ["7", "8", "9", "6"], answer: 2, explain: "72 : 8 = 9. Vì 8 x 9 = 72." },
    { type: "input_number", text: "9 x 9 = ?", answer: 81, explain: "9 x 9 = 81 (bảng nhân 9)." }
  ],

  // ===== LESSON: Nhận biết hình, tính chu vi =====
  "l06": [
    { type: "multiple_choice", text: "Hình vuông có cạnh 5 cm. Chu vi hình vuông là bao nhiêu?", choices: ["15 cm", "20 cm", "25 cm", "10 cm"], answer: 1, explain: "Chu vi hình vuông = 4 x cạnh = 4 x 5 = 20 cm." },
    { type: "input_number", text: "Hình chữ nhật có chiều dài 8 cm, chiều rộng 3 cm. Chu vi là bao nhiêu cm?", answer: 22, explain: "Chu vi HCN = (dài + rộng) x 2 = (8 + 3) x 2 = 22 cm." },
    { type: "multiple_choice", text: "Hình nào có 4 cạnh bằng nhau và 4 góc vuông?", choices: ["Hình chữ nhật", "Hình vuông", "Hình tam giác", "Hình tròn"], answer: 1, explain: "Hình vuông có 4 cạnh bằng nhau và 4 góc vuông." },
    { type: "input_number", text: "Hình vuông có chu vi 36 cm. Cạnh hình vuông là bao nhiêu cm?", answer: 9, explain: "Cạnh = Chu vi : 4 = 36 : 4 = 9 cm." },
    { type: "multiple_choice", text: "Hình chữ nhật có chiều dài 10 cm, chiều rộng 4 cm. Chu vi là?", choices: ["28 cm", "40 cm", "14 cm", "24 cm"], answer: 0, explain: "Chu vi = (10 + 4) x 2 = 28 cm." },
    { type: "input_number", text: "Hình tam giác có 3 cạnh lần lượt là 5 cm, 6 cm, 7 cm. Chu vi là bao nhiêu cm?", answer: 18, explain: "Chu vi tam giác = 5 + 6 + 7 = 18 cm." }
  ],

  // ===== LESSON: Diện tích hình chữ nhật, hình vuông =====
  "l07": [
    { type: "multiple_choice", text: "Diện tích hình vuông cạnh 6 cm là bao nhiêu?", choices: ["24 cm²", "36 cm²", "12 cm²", "30 cm²"], answer: 1, explain: "Diện tích hình vuông = cạnh x cạnh = 6 x 6 = 36 cm²." },
    { type: "input_number", text: "Hình chữ nhật có chiều dài 9 cm, chiều rộng 4 cm. Diện tích là bao nhiêu cm²?", answer: 36, explain: "Diện tích HCN = dài x rộng = 9 x 4 = 36 cm²." },
    { type: "multiple_choice", text: "Hình vuông có diện tích 49 cm². Cạnh hình vuông là?", choices: ["6 cm", "7 cm", "8 cm", "9 cm"], answer: 1, explain: "Cạnh = 7 cm vì 7 x 7 = 49." },
    { type: "input_number", text: "Hình chữ nhật có chiều dài 7 cm, chiều rộng 5 cm. Diện tích là bao nhiêu cm²?", answer: 35, explain: "Diện tích = 7 x 5 = 35 cm²." },
    { type: "multiple_choice", text: "Hình vuông cạnh 10 cm có diện tích là?", choices: ["40 cm²", "100 cm²", "20 cm²", "50 cm²"], answer: 1, explain: "Diện tích = 10 x 10 = 100 cm²." },
    { type: "input_number", text: "Hình chữ nhật có diện tích 48 cm², chiều dài 8 cm. Chiều rộng là bao nhiêu cm?", answer: 6, explain: "Chiều rộng = 48 : 8 = 6 cm." }
  ],

  // ===== LESSON: Đơn vị đo độ dài =====
  "l08": [
    { type: "multiple_choice", text: "1 m = ? cm", choices: ["10 cm", "100 cm", "1000 cm", "50 cm"], answer: 1, explain: "1 m = 100 cm." },
    { type: "input_number", text: "3 km = ? m", answer: 3000, explain: "1 km = 1000 m, nên 3 km = 3000 m." },
    { type: "multiple_choice", text: "5 dm = ? cm", choices: ["5 cm", "50 cm", "500 cm", "55 cm"], answer: 1, explain: "1 dm = 10 cm, nên 5 dm = 50 cm." },
    { type: "input_number", text: "200 cm = ? m", answer: 2, explain: "100 cm = 1 m, nên 200 cm = 2 m." },
    { type: "multiple_choice", text: "Đơn vị nào dùng để đo chiều dài bàn học?", choices: ["km", "m", "cm", "mm"], answer: 2, explain: "Chiều dài bàn học khoảng vài chục cm, nên dùng đơn vị cm." },
    { type: "input_number", text: "4 m 5 dm = ? dm", answer: 45, explain: "4 m = 40 dm, nên 4 m 5 dm = 45 dm." }
  ],

  // ===== LESSON: Xem đồng hồ, ngày tháng =====
  "l09": [
    { type: "multiple_choice", text: "Kim ngắn chỉ số 3, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?", choices: ["12 giờ", "3 giờ", "3 giờ 12 phút", "12 giờ 3 phút"], answer: 1, explain: "Kim ngắn chỉ giờ, kim dài chỉ phút. Kim dài ở 12 nghĩa là đúng giờ. Vậy là 3 giờ." },
    { type: "input_number", text: "1 giờ = ? phút", answer: 60, explain: "1 giờ = 60 phút." },
    { type: "multiple_choice", text: "Tháng 2 (năm không nhuận) có bao nhiêu ngày?", choices: ["28 ngày", "29 ngày", "30 ngày", "31 ngày"], answer: 0, explain: "Tháng 2 năm không nhuận có 28 ngày." },
    { type: "input_number", text: "1 ngày = ? giờ", answer: 24, explain: "1 ngày = 24 giờ." },
    { type: "multiple_choice", text: "8 giờ 30 phút còn gọi là?", choices: ["8 giờ rưỡi", "8 giờ kém 30", "9 giờ 30", "7 giờ rưỡi"], answer: 0, explain: "8 giờ 30 phút = 8 giờ rưỡi." },
    { type: "input_number", text: "2 giờ = ? phút", answer: 120, explain: "2 giờ = 2 x 60 = 120 phút." }
  ],

  // ===== LESSON: Bài toán về nhiều hơn, ít hơn =====
  "l10": [
    { type: "multiple_choice", text: "Lan có 45 viên bi, Hoa có nhiều hơn Lan 18 viên bi. Hỏi Hoa có bao nhiêu viên bi?", choices: ["27", "53", "63", "73"], answer: 2, explain: "Hoa có: 45 + 18 = 63 viên bi." },
    { type: "input_number", text: "Anh có 250 quyển vở, em có ít hơn anh 85 quyển. Em có bao nhiêu quyển vở?", answer: 165, explain: "Em có: 250 - 85 = 165 quyển vở." },
    { type: "multiple_choice", text: "Thùng thứ nhất có 320 kg gạo, thùng thứ hai có ít hơn thùng thứ nhất 75 kg. Thùng thứ hai có bao nhiêu kg gạo?", choices: ["395 kg", "255 kg", "245 kg", "235 kg"], answer: 2, explain: "Thùng thứ hai: 320 - 75 = 245 kg." },
    { type: "input_number", text: "Lớp 3A có 35 học sinh, lớp 3B có nhiều hơn lớp 3A 4 học sinh. Lớp 3B có bao nhiêu học sinh?", answer: 39, explain: "Lớp 3B: 35 + 4 = 39 học sinh." },
    { type: "multiple_choice", text: "Mẹ có 500 nghìn đồng, mẹ mua sách hết 175 nghìn đồng. Mẹ còn lại bao nhiêu nghìn đồng?", choices: ["325", "335", "225", "375"], answer: 0, explain: "Mẹ còn: 500 - 175 = 325 nghìn đồng." },
    { type: "input_number", text: "Cây cam có 156 quả, cây bưởi có nhiều hơn cây cam 44 quả. Cây bưởi có bao nhiêu quả?", answer: 200, explain: "Cây bưởi: 156 + 44 = 200 quả." }
  ],

  // ===== LESSON: Bài toán về gấp, giảm =====
  "l11": [
    { type: "multiple_choice", text: "Mẹ có 8 quả cam, con có gấp 3 lần số cam của mẹ. Con có bao nhiêu quả cam?", choices: ["11", "24", "5", "32"], answer: 1, explain: "Con có: 8 x 3 = 24 quả cam." },
    { type: "input_number", text: "Một sợi dây dài 36 m, cắt thành 4 đoạn bằng nhau. Mỗi đoạn dài bao nhiêu m?", answer: 9, explain: "Mỗi đoạn: 36 : 4 = 9 m." },
    { type: "multiple_choice", text: "Số gấp 5 lần của 7 là bao nhiêu?", choices: ["12", "35", "2", "57"], answer: 1, explain: "Gấp 5 lần của 7 là: 7 x 5 = 35." },
    { type: "input_number", text: "Có 42 cái kẹo chia đều cho 6 bạn. Mỗi bạn được bao nhiêu cái kẹo?", answer: 7, explain: "Mỗi bạn: 42 : 6 = 7 cái kẹo." },
    { type: "multiple_choice", text: "Anh có 56 viên bi, anh cho em 1/8 số bi. Anh cho em bao nhiêu viên bi?", choices: ["7", "8", "6", "9"], answer: 0, explain: "Anh cho em: 56 : 8 = 7 viên bi." },
    { type: "input_number", text: "Mẹ mua 5 quyển vở, mỗi quyển giá 8 nghìn đồng. Mẹ phải trả bao nhiêu nghìn đồng?", answer: 40, explain: "Mẹ trả: 5 x 8 = 40 nghìn đồng." }
  ],

  // ===== LESSON: Ôn tập tổng hợp =====
  "l12": [
    { type: "input_number", text: "456 + 327 = ?", answer: 783, explain: "456 + 327 = 783." },
    { type: "multiple_choice", text: "7 x 8 = ?", choices: ["54", "56", "48", "64"], answer: 1, explain: "7 x 8 = 56." },
    { type: "input_number", text: "Chu vi hình vuông cạnh 8 cm là bao nhiêu cm?", answer: 32, explain: "Chu vi = 4 x 8 = 32 cm." },
    { type: "multiple_choice", text: "3 m 2 dm = ? dm", choices: ["32 dm", "302 dm", "320 dm", "23 dm"], answer: 0, explain: "3 m = 30 dm, nên 3 m 2 dm = 32 dm." },
    { type: "input_number", text: "x + 245 = 700. Tìm x.", answer: 455, explain: "x = 700 - 245 = 455." },
    { type: "multiple_choice", text: "Lan có 24 bông hoa, chia đều vào 4 lọ. Mỗi lọ có mấy bông?", choices: ["4", "5", "6", "8"], answer: 2, explain: "Mỗi lọ: 24 : 4 = 6 bông hoa." },
    { type: "input_number", text: "Diện tích hình chữ nhật dài 7 cm, rộng 4 cm là bao nhiêu cm²?", answer: 28, explain: "Diện tích = 7 x 4 = 28 cm²." },
    { type: "multiple_choice", text: "Số liền sau của 899 là?", choices: ["898", "900", "890", "901"], answer: 1, explain: "Số liền sau của 899 là 900." }
  ],

  // ===== EXAM: Đề ôn HK1 - Đề 1 =====
  "e01": [
    { type: "input_number", text: "Số liền trước của 500 là bao nhiêu?", answer: 499, explain: "Số liền trước của 500 là 499." },
    { type: "multiple_choice", text: "234 + 456 = ?", choices: ["680", "690", "700", "670"], answer: 1, explain: "234 + 456 = 690." },
    { type: "input_number", text: "4 x 9 = ?", answer: 36, explain: "4 x 9 = 36." },
    { type: "multiple_choice", text: "Chu vi hình vuông cạnh 6 cm là?", choices: ["12 cm", "24 cm", "36 cm", "18 cm"], answer: 1, explain: "Chu vi = 4 x 6 = 24 cm." },
    { type: "input_number", text: "1 m = ? cm", answer: 100, explain: "1 m = 100 cm." },
    { type: "multiple_choice", text: "x + 150 = 400. Tìm x.", choices: ["550", "250", "200", "300"], answer: 1, explain: "x = 400 - 150 = 250." },
    { type: "input_number", text: "Lan có 35 viên bi, Hoa có nhiều hơn Lan 27 viên. Hoa có bao nhiêu viên bi?", answer: 62, explain: "Hoa có: 35 + 27 = 62 viên bi." },
    { type: "multiple_choice", text: "5 x 7 = ?", choices: ["30", "35", "40", "45"], answer: 1, explain: "5 x 7 = 35." }
  ],

  // ===== EXAM: Đề ôn HK1 - Đề 2 =====
  "e02": [
    { type: "multiple_choice", text: "Số liền sau của 679 là?", choices: ["678", "680", "690", "670"], answer: 1, explain: "Số liền sau của 679 là 680." },
    { type: "input_number", text: "567 - 238 = ?", answer: 329, explain: "567 - 238 = 329." },
    { type: "multiple_choice", text: "3 x 8 = ?", choices: ["21", "24", "27", "32"], answer: 1, explain: "3 x 8 = 24." },
    { type: "input_number", text: "Hình chữ nhật dài 9 cm, rộng 5 cm. Chu vi là bao nhiêu cm?", answer: 28, explain: "Chu vi = (9 + 5) x 2 = 28 cm." },
    { type: "multiple_choice", text: "2 km = ? m", choices: ["200", "2000", "20", "20000"], answer: 1, explain: "1 km = 1000 m, nên 2 km = 2000 m." },
    { type: "input_number", text: "x - 125 = 375. Tìm x.", answer: 500, explain: "x = 375 + 125 = 500." },
    { type: "multiple_choice", text: "Mẹ có 48 quả cam, chia đều vào 6 rổ. Mỗi rổ có mấy quả?", choices: ["6", "7", "8", "9"], answer: 2, explain: "Mỗi rổ: 48 : 6 = 8 quả." }
  ],

  // ===== EXAM: Đề ôn HK1 - Đề 3 =====
  "e03": [
    { type: "input_number", text: "345 + 255 = ?", answer: 600, explain: "345 + 255 = 600." },
    { type: "multiple_choice", text: "Số liền trước của 300 là?", choices: ["299", "301", "290", "200"], answer: 0, explain: "Số liền trước của 300 là 299." },
    { type: "input_number", text: "5 x 9 = ?", answer: 45, explain: "5 x 9 = 45." },
    { type: "multiple_choice", text: "700 - 356 = ?", choices: ["344", "354", "346", "334"], answer: 0, explain: "700 - 356 = 344." },
    { type: "input_number", text: "Chu vi hình vuông cạnh 7 cm là bao nhiêu cm?", answer: 28, explain: "Chu vi = 4 x 7 = 28 cm." },
    { type: "multiple_choice", text: "4 dm = ? cm", choices: ["4", "40", "400", "44"], answer: 1, explain: "1 dm = 10 cm, nên 4 dm = 40 cm." },
    { type: "input_number", text: "x + 267 = 500. Tìm x.", answer: 233, explain: "x = 500 - 267 = 233." },
    { type: "multiple_choice", text: "Bạn An có 36 viên kẹo, chia đều cho 4 bạn. Mỗi bạn được mấy viên?", choices: ["7", "8", "9", "10"], answer: 2, explain: "Mỗi bạn: 36 : 4 = 9 viên." }
  ],

  // ===== EXAM: Đề ôn HK2 - Đề 1 =====
  "e04": [
    { type: "input_number", text: "7 x 6 = ?", answer: 42, explain: "7 x 6 = 42." },
    { type: "multiple_choice", text: "Diện tích hình vuông cạnh 5 cm là?", choices: ["20 cm²", "25 cm²", "10 cm²", "15 cm²"], answer: 1, explain: "Diện tích = 5 x 5 = 25 cm²." },
    { type: "input_number", text: "456 + 378 = ?", answer: 834, explain: "456 + 378 = 834." },
    { type: "multiple_choice", text: "1 giờ = ? phút", choices: ["30", "45", "60", "100"], answer: 2, explain: "1 giờ = 60 phút." },
    { type: "input_number", text: "72 : 8 = ?", answer: 9, explain: "72 : 8 = 9." },
    { type: "multiple_choice", text: "Hình chữ nhật dài 8 cm, rộng 5 cm. Diện tích là?", choices: ["26 cm²", "40 cm²", "13 cm²", "35 cm²"], answer: 1, explain: "Diện tích = 8 x 5 = 40 cm²." },
    { type: "input_number", text: "Mẹ mua 6 quyển vở, mỗi quyển 7 nghìn đồng. Mẹ trả bao nhiêu nghìn đồng?", answer: 42, explain: "Mẹ trả: 6 x 7 = 42 nghìn đồng." },
    { type: "multiple_choice", text: "900 - 467 = ?", choices: ["433", "443", "333", "543"], answer: 0, explain: "900 - 467 = 433." }
  ],

  // ===== EXAM: Đề ôn HK2 - Đề 2 =====
  "e05": [
    { type: "multiple_choice", text: "8 x 7 = ?", choices: ["54", "56", "63", "48"], answer: 1, explain: "8 x 7 = 56." },
    { type: "input_number", text: "Diện tích hình chữ nhật dài 9 cm, rộng 6 cm là bao nhiêu cm²?", answer: 54, explain: "Diện tích = 9 x 6 = 54 cm²." },
    { type: "multiple_choice", text: "Tháng 4 có bao nhiêu ngày?", choices: ["28", "29", "30", "31"], answer: 2, explain: "Tháng 4 có 30 ngày." },
    { type: "input_number", text: "x - 234 = 456. Tìm x.", answer: 690, explain: "x = 456 + 234 = 690." },
    { type: "multiple_choice", text: "54 : 6 = ?", choices: ["7", "8", "9", "6"], answer: 2, explain: "54 : 6 = 9." },
    { type: "input_number", text: "Có 35 bạn xếp thành 5 hàng đều nhau. Mỗi hàng có bao nhiêu bạn?", answer: 7, explain: "Mỗi hàng: 35 : 5 = 7 bạn." },
    { type: "multiple_choice", text: "Chu vi hình vuông cạnh 9 cm là?", choices: ["18 cm", "27 cm", "36 cm", "81 cm"], answer: 2, explain: "Chu vi = 4 x 9 = 36 cm." }
  ],

  // ===== EXAM: Đề ôn HK2 - Đề 3 =====
  "e06": [
    { type: "input_number", text: "9 x 8 = ?", answer: 72, explain: "9 x 8 = 72." },
    { type: "multiple_choice", text: "Hình vuông cạnh 8 cm. Diện tích là?", choices: ["32 cm²", "64 cm²", "16 cm²", "48 cm²"], answer: 1, explain: "Diện tích = 8 x 8 = 64 cm²." },
    { type: "input_number", text: "678 - 389 = ?", answer: 289, explain: "678 - 389 = 289." },
    { type: "multiple_choice", text: "2 giờ 15 phút = ? phút", choices: ["215", "135", "125", "150"], answer: 1, explain: "2 giờ = 120 phút, nên 2 giờ 15 phút = 135 phút." },
    { type: "input_number", text: "63 : 9 = ?", answer: 7, explain: "63 : 9 = 7." },
    { type: "multiple_choice", text: "Số gấp 6 lần của 8 là?", choices: ["14", "2", "48", "42"], answer: 2, explain: "Gấp 6 lần của 8 = 8 x 6 = 48." },
    { type: "input_number", text: "Mảnh vườn hình chữ nhật dài 9 m, rộng 7 m. Diện tích là bao nhiêu m²?", answer: 63, explain: "Diện tích = 9 x 7 = 63 m²." },
    { type: "multiple_choice", text: "Bạn Mai có 81 viên bi, chia đều vào 9 túi. Mỗi túi có mấy viên?", choices: ["7", "8", "9", "10"], answer: 2, explain: "Mỗi túi: 81 : 9 = 9 viên." }
  ]
};
