---
title: Naive Bayes Classifier
draft: false
date: 2024-06-25 11:52:00 +0700
tags:
  - machine_learning
description: Bài viết trình bày một cách chi tiết cách thành lập Naive Bayes Classifier, một cách để xấp xỉ Bayes (Optimal) Classifier.
---
## 1. Bayes (optimal) classifier

Ta xét bài toán classifier như sau cho một dataset 
$$\mathcal{D} = \left\{ (x_i, y_i) | x_i \in \mathcal{X}, y_i \in \mathcal{Y}, i = \overline{1, n} \right\} $$
Giả sử rằng $(x, y) \sim \mathcal{P}$, tức là bằng cách nào đó ta biết được phân phối $\mathcal{P}$, khi đó hàm Bayes optimal classifier của chúng ta được định nghĩa là:


$$ h_{opt}(\mathbf{x}) = \arg \max_y \mathcal{P}(y \mid \mathbf{x}) $$

Sở dĩ gọi classifier này là optimal vì nó luôn chọn ra label có xác suất xảy ra cao nhất, nên nó tối thiểu hóa được sai số. Tuy nhiên, rõ ràng ta không thể áp dụng thực tiễn ngay được vì gần như ta không thể nào biết được phân bố $\mathcal{P}$.

Tuy nhiên, ta sẽ cố gắng ước lượng được $\mathcal{P}$ bằng suy diễn thống kê. Ta có biến đổi:

$$P(y \mid \mathbf{x}) = \frac{P(\mathbf{x} \mid y) P(y)}{P(\mathbf{x})} = \frac{P(\mathbf{x} \mid y) P(y)}{\displaystyle \sum_{y \in \mathcal{Y}} P(\mathbf{x} \mid y) P(y)}$$

Ước lượng được $P(y)$ thường là dễ dàng, ví dụ với dữ liệu rời rạc, ta có thể ước lượng $P(y)$ bằng tần số xuất hiện của nhãn $y$ (theo MLE), hoặc thêm cả smoothing (theo MAP). Vấn đề khó hơn là làm sao để ước lượng $P(x \mid y)$.

Ta hoàn toàn có thể dùng hướng tiếp cận MLE hoặc cả MAP, tuy nhiên khi đó ta cần phải có **đủ nhiều data** để mô tả một cách tương đối đầy đủ không gian sự kiện. Giả sử, dữ liệu $\mathbf{x}$ có $d$ chiều và mỗi feature chỉ lấy giá trị 0 hoặc 1, có $c$ nhãn, khi đó ta cần khoảng $c(2^d - 1)$ điểm dữ liệu để mô tả đủ không gian sự kiện. Tức là số lượng data cần tăng theo hàm mũ của chiều dữ liệu. Như vậy, khi số chiều quá lớn, việc thu nhập đủ dữ liệu cho ước lượng này là không khả thi!

Để giải quyết việc này, ta cần đặt ra một giả định (assumption) nào đó cho dữ liệu của chúng ta để cho bài toán dễ hơn, như mọi thuật toán machine learning khác đều làm. Và hướng tiếp cận ta đề cập trong bài viết này chính là **Naive Bayes Classifier**.

## 2. Naive Bayes Classifier

### Định nghĩa

Giả định mà ta đặt ra với dữ liệu chính là: **các feature của $\mathbf{x}$ đôi một độc lập với nhau**. Khi đó ta có:

$$P(\mathbf{x} \mid y) = P(\mathbf{x}_1, \mathbf{x}_2, \dots, \mathbf{x}_d \mid y) = \prod_{i = \overline{1, d}}P(\mathbf{x}_i \mid y) \quad (*)$$

Điều này khiến số lượng data cần thu thập từ tăng theo hàm mũ so với $d$, thành chỉ còn tăng tuyến tính theo $d$.

Như vậy, ta có:

$$P(y \mid \mathbf{x}) = \frac{P(y) \prod_{i = \overline{1, d}}P(\mathbf{x}_i \mid y)}{P(x)}$$

Khi đó, Naive Bayes Classifier được định nghĩa là:

$$h(\mathbf{x}) = \arg \max_y [P(y) \prod_{i = \overline{1, d}}P(\mathbf{x}_i \mid y)]$$

Dưới góc nhìn của nhà khoa học máy tính, ta cũng có thể viết:

$$h(\mathbf{x}) = \arg \max_y [\ln P(y) + \sum_{i = \overline{1, d}} \ln P(\mathbf{x}_i \mid y)] \quad (1)$$

Đây chính là dạng công thức chung cho Naive Bayes Classifier. Tất nhiên ta cần phải tìm các ước lượng cho các hàm xác suất trong (1).


### Ước lượng cho $P(y)$
Ta ký hiệu tham số
$$\pi_c = P(Y = c)$$
và gọi $\hat{\pi}_c$ là một ước lượng cho nó. Bằng **MLE**, ta có thể chọn

$$\hat{\pi}_c = \frac{\#D(Y = c)}{n}$$

trong đó #$D(x)$ là hàm đếm số lượng khẳng định $x$ đúng khi chạy khắp $n$ phần tử của $\mathcal{D}$.

Hoặc bằng **MAP với prior là Dirichlet Distribution** (tương đương với kỹ thuật dễ hiểu hơn là **Laplace Smoothing**), ta chọn:

$$\hat{\pi}_c = \frac{\#D(Y = c) + \beta}{n + \beta|\mathcal{Y}|}$$

Thế là ta đã ước lượng xong $\pi_c$. Còn đối với cách ước lượng $P(X_i \mid Y)$, điều này phụ thuộc vào tập nguồn $\mathcal{X}$. Vì thế ta sẽ khảo sát kỹ ở ngay mục sau.

## 3. Naive Bayes cho inputs rời rạc

### 3. 1 Categorical features

Giả sử mỗi feature $X_i$ đều nhận các giá trị rời rạc thuộc tập hợp $J_i$, tức là tuân theo categorical distribution của nó. Ta ký hiệu tham số:

$$\theta_{i,j,c} = P(X_i=j|Y = c), \; j \in J_i $$

Khi đó, với MLE, ta có ước lượng:

$$ \hat{\theta}_{i,j,c} = \frac{\#D(X_i = j \land Y = c)}{\#D(Y = c)} \quad (2) $$

trong đó #$D(x)$ là hàm đếm số lượng khẳng định $x$ đúng khi chạy khắp $n$ phần tử của $\mathcal{D}$.

Ta cũng có thể dùng MAP và dễ dàng có được ước lượng:

$$ \hat{\theta}_{i,j,c} = \frac{\#D(X_i = j \land Y = c) + \alpha}{\#D(Y = c) + \alpha|J_i|} $$

Thành lập các ước lương này chính là bước train data. Thay các ước lượng đã lập được vào (1), ta sẽ có được Naive Bayes Classifier:

$$h_{\text{Cat}}(\mathbf{x}) = \arg \max_y [\ln \hat{\pi}_c + \sum_{i = \overline{1, d}} \ln \hat{\theta}_{i,\mathbf{x}_i,y}] \quad$$

Cách này thường được áp dụng trong text classification với hai thuật toán tiêu biểu:
- **Bernoulli event model**: chính là Naive Bayes cho các feature là nhị phân, tức là tuân theo phân phối Bernoulli.
- **Multinomial event model**: còn được gọi với cái tên là Multinomial Naive Bayes, tuy nhiên mô hình này không phải là mỗi feature đều tuân theo phân phối Multinomial mà bản chất vẫn thuộc loại Categorical Features. Thực tế, việc đặt tên này là khá gây bối rối và khiến tôi mất khá nhiều thời gian để tìm hiểu. Chi tiết cụ thể hơn sẽ được trình bày ngay phần sau.

### 3.2 Multinomial Naive Bayes

Khi nhắc đến Naive Bayes, đây chính là thứ mà mọi người sẽ mặc định nghĩ đến. Tuy nhiên, thuật toán này không chỉ áp dụng y nguyên công thức ở phần 3.1, mà có một số sự điều chỉnh.

Nhìn vào $(2)$, ta thấy rằng, nếu trong một document, thì một từ chỉ được đếm 1 lần. Với text classification, điều này là còn khá yếu. Ví dụ, ta muốn phân loại email thành spam/normal. Nếu chỉ dùng Bernoulli event model (là áp dụng trực tiếp của $(2)$) thì rõ ràng "Buy product" hay "Buy Product Buy Product Buy Product Buy Product" đều có chung một ước lượng. Ta cần một ước lượng chính xác hơn, gắn liền với tần suất nó suất hiện trong văn bản.

Trước khi đi vào phần điều chỉnh, ta có một số quy ước. Đầu tiên, ta viết lại tập dataset cho hợp hơn với bài toán text classification:

$$\mathcal{D} = \left \{ (d_1, c_1), (d_2, c_2), \dots, (d_n, c_n) \right \}$$

trong đó $d_i$ là một document, $c_i$ là class của nó.
Giả sử document $d_i$ là một dãy $n_i$ từ, gồm:

$$w_{i,1}, w_{i,2}, w_{i,3}, \dots ,w_{i,n_i}$$

Tất cả các từ thuộc tất cả documents đều thuộc cùng một tập vocabulary $\mathcal{V}$ (cũng có người gọi là dictionary), tức là

$$\mathcal{V} \supseteq \{w|w \in d_i, \; i = \overline{1,n}\}$$

Để tạo ra được ước lượng gắn liền với tần suất mà từ xuất hiện, trước tiên ta gọi

$$
\begin{align*}
\mathcal{D}^* =
\{
	&(w_{1,1}, c_1), (w_{1,2}, c_1), (w_{1,3}, c_1), \dots,(w_{1,n_1}, c_1),\\ 
	&(w_{2,1}, c_2), (w_{2,2}, c_2), (w_{2,3}, c_2), \dots,(w_{2,n_2}, c_2),\\
	& \vdots \\
	&(w_{n,1}, c_n), (w_{n,2}, c_n), (w_{n,3}, c_n), \dots,(w_{n,n_n}, c_n)
\}
\end{align*}
$$

tức là "banh các documents ra".

Bây giờ chính là phần điều chỉnh. Vẫn như trên, ta vẫn có ký hiệu tham số:

$$ \theta_{i,w,c} = P(X_i=w|Y = c), \; w \in \mathcal{V} $$

Với MLE, ta có ước lượng:

$$ \hat{\theta}_{i,w,c} = \frac{\#D^*(X = w \land Y = c)}{\#D^*(Y = c)} \quad (3) $$

trong đó #$D^*$ là hàm đếm số lượng khẳng định $x$ đúng khi chạy khắp $n$ phần tử của $\mathcal{D}^*$. Lưu ý là $\hat{\pi}_c$ không đổi. Rõ ràng với sự điều chỉnh này, tần số xuất hiện của 1 từ sẽ có tác động lớn hơn trong việc phân loại.

Ngoài ra, nhìn vào $(3)$ ta cũng thấy rằng ước lượng không phụ thuộc vào $i$ nữa, nên ta đặt:

$$\hat{\theta}_{i,w,c} = \hat{\phi}_{w,c}, \; \forall i \in \overline{1, n_k}, \; k = \overline{1, n}$$

Vậy, với một document để test $\mathbf{d}$, ta có hàm likelihood:

$$P(\mathbf{d} \mid Y = c) = \prod_{w \in \mathbf{d}} \hat{\phi}_{w,c}$$

Ở bước implementation, để đơn giản hơn và tiết kiệm bộ nhớ, người ta thường cho $n_k = \lvert \mathcal V \rvert$ và tạo một vector $\mathbf{f}$ gồm các tần số của các từ trong document $\mathbf{d}$ (đây gọi là kỹ thuật bags of words). Chú ý rằng $\mathbf{f}$ có $d$ chiều chính là số từ phân biệt trong $\mathcal{d}$ và từ $w_i$ lặp lại $f_i$ lần, ta có Multinomial Naive Classifier:

$$h_{\text{Mul}}(\mathbf{x}) = \arg \max_y \hat{\pi}_c \prod_{i = \overline{1, d}} (\hat{\phi}_{w_i,y})^{f_i} \quad (4)$$

**Bàn về cách đặt tên "Multinomial Naive Bayes (MNB)"**: Rõ ràng đây là một cách đặt tên rất gây hiểu nhầm khi mỗi feature không hề tuân theo Multinomial distribution. Có người lý giải rằng: "Trong cộng đồng DS-AI, Multinomial và Categorical Distribution có thể dùng thay thế cho nhau nên MNB với Categorical NB là một." Cách lý giải này khá hợp lý khi MNB chính là CNB khi mỗi feature là một *word* thuộc chung một *vocabulary*.
Thật ra, nếu ta coi mỗi document tuân theo Multinomial Distribution với các xác suất $\hat{\theta}_{w_i,y}$,, tức là:

$$P(\mathbf{d} \mid Y = c) = \frac{(\sum f_i) !}{\prod f_i!} \prod_{i = \overline{1, d}} (\hat{\theta}_{w_i,y})^{f_i}$$

thì ta vẫn sẽ thu được Classifier y như $(4)$. Điều này giải thích cho "Multinomial" trong cái tên. Nhưng ngay cả như thế, nó cũng không hề "Naive Bayes" khi không tuân theo $(*)$. Tóm lại, cái tên khá là "lú"! Tuy vậy, đây là tên được dùng khá phổ biến, kể cả Wikipedia và scikit-learn.

## 4. Naive Bayes cho inputs liên tục - Gaussian Naive Bayes

Giả sử mỗi feature $X_i$ đều nhận các giá trị liên tục. Ta có thể giả sử nó tuân theo phân phối chuẩn, ta hoàn toàn có thể chọn phân phối liên tục khác nhưng phân phối chuẩn là lựa chọn phổ biến. Tức là ta chọn $X_i\mid c \sim \mathcal{N}(\mu_{i,c}, \sigma_{i,c}^2)$.

Bằng MLE, ta cũng có thể có được các ước lượng:

$$
\begin{align}
\hat{\mu}_{i, c} &= \frac{1}{\sum_{j=1}^{n} 1(y_j = c)} \sum_{j = 1}^{n} 1(y_j = c) x_j^{(i)}  \\
\hat{\sigma}_{i, c}^2 &= \frac{1}{\sum_{j=1}^{n} 1(y_j = c)} \sum_{j=1}^{n} 1(y_j = c)(x_j^{(i)} - \mu_{i, c})^2
\end{align}
$$

trong đó $x_j^{(i)}$ là feature thứ $i$ của vector $x_j$, $1(.)$ là indicator function.

## 5. Naive Bayes với binary classification chính là một Linear Classifier! (đọc thêm)

Ta sẽ chứng minh khẳng định ở tiêu đề với MNB.

Giả sử $\mathcal{Y} = \{ -1, +1 \}$. Ta sẽ lần lượt tính likelihood:

$$
\begin{align*}
	P(\mathbf{d}|+1)
		&= \prod_{w \in \mathbf{d}} \hat{\phi}_{w,+1} \\
		&= \prod_{i=1}^d (\hat{\phi}_{w_i,+1})^{f_i} \\
		&= \exp \left( \sum_{i=1}^d f_i \ln \hat{\phi}_{w_i,+1} \right) \\
		&= \exp(\mathbf{f}^T \Theta_+)
\end{align*}
$$

với $d$ lúc này là số chiều dữ liệu sau khi dùng kỹ thuật Bags of Words, $\Theta_+$ là vector các tham số $\theta_{w_i, +1}$.

Tương tự, ta cũng có:

$$P(\mathbf{d}|-1) = \exp(\mathbf{f}^T \Theta_-) $$

Ta đặt

$$P(+1) = \exp(b_+), \quad P(-1) = \exp(b_-)$$

Lúc này, ta có

$$
\begin{align*}
	P(+1 \mid \mathbf{d})
		&= \frac{P(\mathbf{d} \mid +1)P(+1)}{P(\mathbf{d} \mid +1)P(+1) + P(\mathbf{d} \mid -1)P(-1)}\\
		&= \frac{\exp(\mathbf{f}^T \Theta_+ + b_+)}{\exp(\mathbf{f}^T \Theta_+ + b_+) + \exp(\mathbf{f}^T \Theta_- + b_-)} \\
		&= \frac{1}{1 + \frac{\exp(\mathbf{f}^T \Theta_- + b_-)}{\exp(\mathbf{f}^T \Theta_+ + b_+)}} \\
		&= \frac{1}{1 + \exp(-(\mathbf{f}^T \Theta_+ + b_+ - \mathbf{f}^T \Theta_- - b_-))}\\
		&= \frac{1}{1 + \exp(-(\mathbf{f}^T \Theta + b))} \quad \quad (\Theta = \Theta_+ - \Theta_-;\; b = b_+ - b_-)

\end{align*}
$$

Như vậy

$$P(y \mid \mathbf{d}) = \frac{1}{1 + \exp(y(\mathbf{f}^T \Theta + b))}$$

Với GNB, ta cũng có thể thu được kết quả tương tự nếu ta giả sử:

$$\hat{\sigma}_{i, +1} = \hat{\sigma}_{i, -1}, \quad \forall i = \overline{1, d}$$

Kết quả đó có dạng:

$$P(y | \mathbf{x}) = \frac{1}{1 + \exp ({y(wx+b)})}$$

Như vậy ta có điều phải chứng minh. $\square$

> Nhận xét: Công thức của GNB có hình thức rất giống với Logistic Regression, nên ta có thể coi hai biến thể này là "họ hàng" của nhau. Tuy nhiên, mặc dù cùng một công thức, ta vẫn cần nhớ rằng tham số thay vào của mỗi mô hình là khác nhau! Rộng hơn, GNB là Generative model, còn LR là Discriminative model.