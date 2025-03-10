---
title: MLE và MAP
draft: false
date: 2024-06-23 17:55:10 +0700
tags:
  - machine_learning
  - bayesian
  - MLE
  - MAP
description: "Bài viết này giới thiệu ngắn gọn về hai trường phái chính thông suy diễn thống kê: tần suất và Bayesian, sau đó sẽ đi vào chi tiết về MLE và MAP, đại diện cho ước lượng điểm của mỗi trường phái."
---
## 0. Phân biệt lý thuyết xác suất và suy luận thống kê

Trước khi đi vào nội dung chính của bài viết, ta nói sơ qua sự khác nhau giữa lý thuyết xác suất và suy luận thống kê.
- Với lý thuyết xác suất, ta dùng một mô hình (phân phối nào đó) có trước, để tính xác suất xảy ra một sự kiện nào đó.
  Ví dụ, cho trước một đồng xu mà khi ta tung nó thì được xác suất ra mặt ngửa là $0.6$. Vậy khi ta tung 6 lần, xác suất để xảy ra sự kiện: S, N, N, S, N, S chính là $0.6^3.0.4^3 = 0.013824$
- Với suy luận thống kê, quy trình ngược lại. Ta sẽ có một loạt các sự kiện (dữ liệu) cho trước và ta cần phải đi tìm ngược lại mô hình (phân phối) phù hợp nhất với dữ liệu quan sát được.
  Ví dụ, ta tung một đồng xu 6 lần và nhận được: S, N, N, S, N, S. Từ đây ta cần tìm xem xác suất ra mặt ngửa của đồng xu là bao nhiêu. Một cách trực quan, vì tung 6 lần được 3 ngửa, nên ta có thể ước lượng rằng xác suất là $0.5$. Tuy nhiên, ta cần có một phương pháp khoa học hơn để đưa ra kết luận.

### Sơ lược về frequentist và bayesian

Để thực hiện việc tìm mô hình phù hợp nhất đối với dữ kiện đã quan sát được, người ta có hai phương pháp chính:
1. _Tần suất_: Đây là cách tiếp cận cổ điển khi mà xác suất được coi là "tần số khi số lượng điểm tiến đến vô cùng". Đồng thời, những tham số của một phân phối được coi là _cố định_ (và là ẩn số).
   Rõ hơn về hướng tiếp cận này, giả sử ta muốn tìm chiều cao trung bình của người Việt vào năm 2024. Phương pháp _tần suất_ tiếp cận bằng cách cho rằng: chiều cao trung bình của người Việt vào năm 2024 là cố định (gọi là $\mu$). Sau đó, ta sẽ một loạt các dữ liệu về chiều cao, ví dụ như của 1000 người ngẫu nhiên và đo được chiều cao trung bình của 1000 người này là 175cm. Phương pháp _tần suất_ cho rằng khi ta có nhiều dữ liệu hơn, thì kết quả thu được từ mẫu sẽ ngày càng tiến gần hơn với $\mu$.
2. _Bayesian_: Đây là cách tiếp cận khi mà "xác suất là thứ trong đầu của ta" chứ không phải là một đại lượng khách quan cố định như phương pháp _tần suất_ quan niệm. Xác suất chính là niềm tin, sự chắc chắn của ta về một sự kiện nào đó. Và niềm tin này hoàn toàn có thể được cập nhật (bằng định lý Bayes) khi chúng ta có thêm dữ kiện.
   Rõ hơn về hướng tiếp cận này, giả sử một người tin rằng xác suất anh ta mắc bệnh D là 1%. Anh ta đi xét nghiệm và được kết quả là dương tính. Tuy rằng kết quả xét nghiệm có thể đúng hoặc sai, nhưng chắc chắn anh ấy nên cập nhật lại niềm tin về xác suất mắc bệnh của mình.

## 1. Maximum Likelihood Estimation (MLE)

### Định nghĩa

Giả sử, ta có tập dữ liệu $\mathcal{D} = \{\mathbf{x}_1, \mathbf{x}_2, \dots, \mathbf{x}_N \}$. Nhắc lại, suy luận thống kê chính là ta muốn tìm một mô hình nào đó sao cho nó "khớp" với tập dữ liệu này nhất. Mỗi một mô hình sẽ được đặc trưng bởi một hoặc nhiều tham số, ví dụ như phân phối chuẩn thì được đặc trưng bởi cặp $\{\mu, \sigma^2\}$, gọn hơn ta nói mỗi mô hình được đặc trưng bởi một vector tham số $\theta$. Khi đó, mô hình mà ta muốn tìm, mô hình "khớp" nhất, chính là mô hình mà khi ta áp dụng nó, xác suất xảy ra $\mathcal{D}$ là lớn nhất. Cụ thể là ta cần tìm:

$$\hat{\theta}_{MLE} = \arg \max_{\mathbf{\theta}} P_{\theta}(\mathcal{D})$$

Quá trình này gọi là MLE. Sở dĩ ta gọi như thế vì ta đang cố gắng tìm max của hàm likelihood $P_{\theta}(\mathcal{D})$. Đây là hướng tiếp cận theo trường phái _tần suất_.

Lưu ý rằng các cách viết $P_{\theta}(\mathcal{D})$, $P(\mathcal{D};\theta)$ và $P(\mathcal{D} \mid \theta)$ là như nhau, đều chỉ likelihood xảy ra $\mathcal{D}$ khi áp dụng $\theta$, mặc dù cách viết cuối không được chấp nhận bởi những người theo trường phái _tần suất_ (vì $\theta$ **không phải** biến ngẫu nhiên) nhưng vẫn có rất nhiều tài liệu viết như thế.

### Ví dụ

Giả sử ta tung một đồng xu mà xác suất ra mặt ngửa là $\theta$. Khi ta tung $n$ lần, ta được $n_H$ lần ra mặt ngửa. Ta cũng tiện ký hiệu $n_T = n - n_H$. Mục tiêu của MLE chính là cần tìm

$$\hat{\theta}_{MLE} = \arg \max_{\theta} P(n_H \mid \theta)$$

Ta có: $P(n_H \mid \theta) = \theta^{n_H}(1 - \theta)^{n_T}$, mặt khác vì hàm số $y = \log(x)$ là đồng biến trên $[0, 1]$, vì thế

$$
\begin{align*}
	\hat{\theta}_{MLE} &= \arg \max_{\theta} \log (\theta^{n_H}(1 - \theta)^{n_T}) \\
				 &= \arg \max_{\theta} (n_H\log \theta + n_T \log (1 - \theta))
\end{align*}
$$

Từ đây, bằng kiến thức trung học, ta dễ dàng tìm ra được:

$$\hat{\theta}_{MLE} = \frac{n_H}{n}$$

Kết quả này hoàn toàn có thể tổng quát ra, thu được: **ước lượng tốt nhất chính là tần số** - rất đúng với quan niệm của trường phái _tần suất_.

### Nhận xét

Ta rút ra được một số nhận xét sau về MLE:
1. MLE mô tả đúng data ta quan sát được
2. Khi $n \to \infty$, $\hat{\theta}_{MLE} = \theta$, tức là với data nhiều, MLE sẽ thể hiện rất tốt.
3. Đổi lại, khi data quá ít, MLE có thể dẫn đến overfit. Như ví dụ trên, sẽ thật tệ khi $n_H = 0$. Khi đó ước lượng của chúng ta chắc chắn không thể thể hiện tốt khi ta tung ra mặt ngửa trong tương lai.

## 2. Maximum a Posteriori

### Định nghĩa
 
 Một điểm thay đổi rất quan trọng của _Bayesian_ so với _tần suất_ chính là: **$\theta$ có thể được coi như một biến ngẫu nhiên**. Khi đó, cho trước một prior $P(\theta)$, ước lượng MAP chính là đi tìm:
 
$$\hat{\theta}_{MAP} = \arg \max_{\theta} P(\theta \mid \mathcal{D})$$

Lại theo định lý Bayes, ta có

$$P(\theta \mid \mathcal{D}) = \frac{P(\mathcal{D} \mid \theta) P(\theta)}{P(\mathcal{D})} \; (1)$$

trong đó $P(\theta \mid \mathcal{D})$ được gọi là xác suất hậu nghiệm (posterior probability).

Vì thế, ta có thể viết công thức MAP thành:

$$\hat{\theta}_{MAP} = \arg \max_{\theta} P(\mathcal{D} \mid \theta) P(\theta)$$

Chú ý rằng, khi $P(\theta)$ là một hằng số thì $\hat{\theta}\_{MAP} = \hat{\theta}\_{MLE}$. Như vậy, tuy thuộc hai trường phái khác nhau, ta có thể coi MAP chính là mở rộng của MLE.

### Chọn prior - Conjugate prior

Từ (1), ta thấy rằng để tiện cho việc tính toán, ta nên chọn prior sao cho xác suất hậu nghiệm thuộc một phân phối "đẹp", tức là thuộc những phân phối phổ biến. Một trong những cách chọn chính là chọn sao cho prior và posterior đều thuộc cùng một loại phân phối (như phân phối chuẩn, phân phối beta,...). Prior được chọn như này được gọi là conjugate prior.

Sau đây là một số conjugate priors phổ biến:

| Likelihood Distribution | Conjugate Prior Distribution | Posterior Distribution        |
|-------------------------|------------------------------|-------------------------------|
| Binomial/Bernoulli      | Beta                         | Beta                          |
| Poisson                 | Gamma                        | Gamma                         |
| Normal (known variance) | Normal                       | Normal                        |
| Exponential             | Gamma                        | Gamma                         |
| Multinomial             | Dirichlet                    | Dirichlet                     |
| Categorical             | Dirichlet                    | Dirichlet                     |

### Ví dụ:

Ta lấy lại ví dụ như phần MLE. Giả sử ta tung một đồng xu mà xác suất ra mặt ngửa là $\theta$. Khi ta tung $n$ lần, ta được $n_H$ lần ra mặt ngửa. Ta cũng tiện ký hiệu $n_T = n - n_H$.
Rõ ràng, likelihood có dạng của phân phối Bernoulli, vì thế ta sẽ chọn prior có dạng phân phối Beta. Cụ thể $\theta \sim \text{Beta}[\alpha, \beta]$. Khi đó, ước lượng MAP sẽ là

$$
\begin{align*}
	\hat{\theta}_{MAP} &=  \arg \max_{\theta} P(n_H | \theta) P(\theta) \\
						  &= \arg \max_{\theta} \theta^{n_H}(1 - \theta)^{n_T} .\theta^{\alpha - 1}(1 - \theta)^{\beta - 1} \\
						  & = \arg \max_{\theta} \theta^{n_H + \alpha - 1}(1 - \theta)^{n_T + \beta - 1} 
\end{align*}
$$

Tương tự, ta tìm ra được: 

$$\hat{\theta}_{MAP} = \frac{n_H + \alpha - 1}{n + \alpha + \beta - 1} \quad (2)$$

Ta có thể hiểu ý nghĩa kết quả này như sau: giả sử ta tung 10 lần và cả 10 lần đều ra mặt sấp. Theo MLE, thì xác suất xảy ra mặt ngửa là 0. Nhưng niềm tin của chúng ta không như thế, vì thế ta cộng thêm một đại lượng như trên để phòng trường hợp đấy xảy ra. Thật ra, trường phái _tần suất_ có một kỹ thuật dùng để đối phó với trường hợp khó chịu ấy chính là _Laplace smoothing_ - cũng cho ra kết quả tương tự như (2).

### Nhận xét

Ta rút ra được một số nhận xét sau về MAP:
1. MAP có thể coi như là một phương pháp mở rộng của MLE nhằm tránh overfitting - theo như ngôn ngữ machine learning. Khi đó prior đóng vai trò như _regularization_.
2. Khi $n \to \infty$ thì $\hat{\theta}\_{MAP} = \hat{\theta}\_{MLE} = \theta$. Vì thế khi ta có nhiều dữ liệu, 2 phương pháp là gần như giống nhau.
3. Khi ta chỉ có ít dữ liệu, MAP sẽ thể hiện tốt **chỉ khi** prior được chọn rất sát với $\theta$.