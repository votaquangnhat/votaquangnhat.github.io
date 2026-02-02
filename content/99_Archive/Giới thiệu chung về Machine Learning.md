---
title: Giới thiệu chung về Machine Learning
draft: false
date: 2024-06-05 08:40:00 +0700
tags:
  - machine_learning
description: Series bài viết này tổng hợp những gì mình học được từ thầy Khoát ở SoICT và các tài liệu online khác.
---

Ở bài viết đầu tiên, chúng ta sẽ nói rất sơ lược về Machine Learning.


## Định nghĩa

Một định nghĩa cho Machine Learning là: “A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.” – (Mitchell, 2006). Nôm na tức là: “Programs improve in some task with experience.”

Về cách hoạt động của Machine Learning, ta có cách nói dí dỏm:

![Dí dỏm](https://votaquangnhat.wordpress.com/wp-content/uploads/2024/06/image.png)

Thật vậy, với một tập dữ liệu cho trước, ta giả sử nó tuân theo một quy luật nào đấy. Một thuật toán ML gồm các bước:

1. Có data (thường là cần rất nhiều)
2. Chọn mô hình xác suất nào đó (model)
3. Dùng data để tìm ra tham số phù hợp cho model (dựa trên 1 tiêu chí nào đó, hay rõ hơn là tối ưu objective function)

Bước 3 gọi là “learning a model” hay “train model”. Kết quả chính là một model đã được chọn cho tham số phù hợp.  
Lưu ý rằng, đầu ra của thuật toán Machine Learning chính là một model, là một thuật toán (để tiếp tục thực thi với input mới). Điều này khác với những thuật toán truyền thống khi những thuật toán truyền thống cho ra đầu ra là những kết quả cụ thể.

## Phân loại

Thuật toán Machine Learning được chia làm các loại chính như sau:

1. Supervised learning:
    - Classification: gồm multi-class classification và multi-label classification
    - Regression
2. Unsupervised learning:
    - Clustering
    - Trend detection
3. Reinforcement learning

## Một số vấn đề cần lưu ý

Dựa vào 3 bước đã nêu trên của một thuật toán ML, ta có thể dễ dàng đoán được các lưu ý sau:

1. Data có đủ nhiều, đủ tốt (không bị nhiễu) và có thể học được hay không?
2. Chọn model nào là ổn nhất?
3. Tiêu chí để tìm tham số đã ổn chưa?

Nói riêng về ý 3, với một tiêu chí đã chọn, ta có thể làm nó tốt hơn bằng cách thêm vào các thành phần có tham số hiệu chỉnh riêng. Các tham số ấy được gọi là hyper-parameters, để phân biệt với parameters là tham số của model. Việc thêm các tham số hiệu chỉnh này gọi là regularization.

Với thuật toán thu được từ thuật toán ML, ta có hai vấn đề có thể xảy ra:

1. Overfitting: Thuật toán cho ra kết quả (rất) tốt với data cho vào, nhưng lại cho kết quả rất tệ khi ta cho data mới vào. Thầy Khoát gọi là “học vẹt”. Nguyên nhân xảy ra thường là do model quá phức tạp, training data không đủ lớn hoặc đủ tốt. Có thể khắc phục được bằng cách giải quyết các nguyên nhân đã nêu, hoặc dùng regularization.
2. Underfitting: Thuật toán cho ra kết quả tệ, kể cả data đầu vào và data mới. Thầy Khoát gọi là “học không đến nơi đến chốn”. Việc này xảy ra thường tại model quá đơn giản.

## Toán cho Machine Learning

Machine Learning được xây dựng dựa trên toán học. Vì thế, có một nền tảng toán học vững chắc là cần thiết để hiểu sâu về ML. Nhưng vì lý do lịch sử, Machine Learning thường được dạy bởi viện/trường CNTT và dành cho sinh viên CS. May mắn thay, HUST rất trọng toán, nên mình không gặp nhiều khó khăn khi học ML. Dưới đây là một số nhánh của toán học làm nên nền tảng cho ML.

1. Đại số tuyến tính
2. Giải tích
3. Xác suất và thống kê
4. Tối ưu