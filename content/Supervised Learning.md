---
title: Supervised Learning
draft: false
date: 2024-06-07 00:42:01 +0700
tags:
  - machine_learning
description: Ở bài viết này, ta sẽ phát biểu bài toán Supervised Learning và lần lượt đề cập vài vấn đề từ nó. Cuối cùng sẽ tổng kết lại quy trình.
---

## 1. Khái niệm mở đầu

Cho trước tập dữ liệu có $n$ phần tử
$$\mathcal{D} = \left\{ (x_i, y_i) | x_i \in \mathcal{X}, y_i \in \mathcal{Y}, i = \overline{1, n} \right\} $$trong đó:
- $\mathcal{X}$ là một không gian $d$ chiều, được gọi là feature space. $x_i$ được gọi là một feature vector, gồm các features.
- $\mathcal{Y}$ là tập nhãn.

Gọi $\mathcal{P}(\mathcal{X}, \mathcal{Y})$ là mô hình phân bố các điểm $(x, y) \in \mathcal{X} \times \mathcal{Y}$ . Từ $\mathcal{D}$, ta muốn chọn ra một hàm $h$ sao cho: với mỗi $(x, y) \sim \mathcal{P}$ , ta có $h(x) \approx y$, tức là ta muốn tìm cách hiểu rõ $\mathcal{P}$ nhất có thể.  Đây chính là bài toán Supervised Learning.

Dựa trên tập $\mathcal{Y}$, ta có thể chia bài toán Supervised Learning thành:

|            $\|\mathcal{Y}\| = 2$             |   Binary Classification   |
|            $\|\mathcal{Y}\| > 2$             | Multilabel Classification |
| $\mathcal{Y}$ là một khoảng trên tập số thực |        Regression         |


Vì số lượng các hàm số đi từ $\mathcal{X}$ đến $\mathcal{Y}$ là rất lớn, nên ta chỉ chọn một số hữu hạn hàm hay lớp hàm mà ta cho rằng là khả thi để tìm kiếm. Ta gọi tập hợp tất cả các hàm khả thi mà ta đã chọn là hypothesis class, ký hiệu là $\mathcal{H}$. Từ đây, ta có thể chọn ra hàm "tốt nhất" trong $\mathcal{H}$. Ta sẽ làm rõ hơn ý "tốt nhất" ở phần ngay sau.

## 2. Đánh giá độ tốt

Để đánh giá một hàm $h$ có tốt hay không, trước tiên ta phải lượng hóa được độ "tốt". Cho trước tập $S \in \mathcal{X} \times \mathcal{Y}$ hữu hạn, ta có một số cách đánh giá như sau:

- 0/1 Loss: hàm này đánh giá "độ sai" của hàm $h$, tức là ta cần tìm $h$ để hàm nhỏ nhất

$$
\mathcal{L}_{0/1}(h, \mathcal{S}) = \frac{1}{n} \sum_{(x, y) \in \mathcal{S}} \delta(h(x) \neq y), \mbox{ với }\delta(h(x)\ne y)=\begin{cases}
1,&\mbox{ nếu \(h(x)\ne y\)}\\
0,&\mbox{ o.w.}
\end{cases}
$$

Nhược điểm ta thấy rõ của hàm này là nó không liên tục, không khả vi. Vì thế việc tìm nghiệm tối ưu sẽ khá khó khăn
- Square Loss: 

$$\mathcal{L}_{square}(h, \mathcal{S})=\frac{1}{n}\sum_{(x,y)\in \mathcal{S}}(h(x)-y)^2.$$ 

Hàm này thường được dùng trong các bài toán regression. Một ưu điểm của hàm này là khi tối ưu, các giá trị $h(x)$ sẽ không thể quá lệch so với $y$ (nhờ phép bình phương). Tuy nhiên cũng vì đó, mà khi $h(x)$ và $y$ không quá lệch nhau, thì sai số sẽ bị coi là không đáng kể. Ví dụ dễ hiểu là $10^2 = 100, \; 0.1^2 = 0.01$ . Và từ 2 sự kiện ấy, ta tối ưu hàm này trên training data thì hàm $h$ thu được rất có thể gặp vấn đề overfitting.
- Absolute loss: 

$$\mathcal{L}_{abs}(h, \mathcal{S})=\frac{1}{n}\sum_{(x,y)\in \mathcal{S}}|h(x)-y|.$$

Khá tương tự như hàm trên, tuy nhiên ở đây, sai số được tính là tuyến tính so với độ chênh lệch. Vì thế những hiệu ứng của hàm Square loss cũng được giảm bớt đi.

Các hàm $\mathcal{L}$ dùng để đánh giá ở trên gọi là loss function. Các hàm $\mathcal{L}$ có dạng:

$$\mathcal{L}(h, \mathcal{S})=\frac{1}{n}\sum_{(x,y)\in \mathcal{S}}\mathcal{l}(x, y|h)$$
Tuy nhiên, đây là đánh giá trên một tập hữu hạn, ta dễ dàng thu được kết quả với tập vô hạn bằng cách đổi từ tổng thành tích phân.

Từ đây, ta có thể viết được loss function cho toàn không gian $\mathcal{X} \times \mathcal{Y}$ chính là:

$$
\begin{align*}
\mathcal{L}(h) = \mathcal{L}_{\mathcal{P}}(h)  &= \int_{\mathcal{X} \times \mathcal{Y}} \mathcal{l}(x,y|h).\mathcal{P}(x,y) \ dxdy  \\ \\
				&= \mathbb{E}_{(x,y) \sim \mathcal{P}} [\mathcal{l}(x, y|h)]
\end{align*}
$$

Như vậy, ở bài toán supervised learning, chúng ta muốn tìm một hàm $h = \text{argmin } \mathcal{L}(h)$

Tuy nhiên trên thực tế, ta không biết được phân bố $\mathcal{P}$, vì thế không thể tính được $\mathcal{L}(h)$. Vì thế, ta cần một ước lượng $\hat{\mathcal{L}}$ cho $\mathcal{L}$. Đây chính là lúc ta cần tới $\mathcal{D}$.

Để đi tìm một ước lượng $\hat{\mathcal{L}}$ , ta cần một tập hợp $S$ mà các phần tử là độc lập cùng phân phối (i.i.d) được lấy từ không gian $\mathcal{X} \times \mathcal{Y}$. Khi đó ta có thể lấy $\hat{\mathcal{L}}(h) = \mathcal{L}(h, S)$

## 3. Train/test splitting

Ta chia tập data $\mathcal{D}$ ra thành $D_{\text{train}}$ và $D_{\text{test}}$. Ta sẽ dùng tập $D_{\text{train}}$ để tìm ra một hàm $h$ sao cho $\mathcal{L}(h,D_{\text{train}})$ (gần) tối ưu. Bước này gọi là train model. Còn ta dùng $D_{\text{test}}$ để đánh giá (evaluation), tức là $\hat{\mathcal{L}}(h) = \mathcal{L}(h, D_{\text{test}})$.

Lưu ý rằng $D_{\text{test}}$ cần có các phần tử độc lập cùng phân phối, tức là ngay từ đầu $\mathcal{D}$ cũng nên như thế (vì vậy, khâu lấy data rất quan trọng).

Trên thực tế, ở bước train, ngoài các tham số của $h$ mà ta cần tìm, có thể còn có nhiều hyperparameters khác dùng để hiệu chỉnh (hoặc là ta có rất model). Vì thế ta cần có thêm tập $D_{\text{valid}}$ để đánh giá kết quả train, từ đó quay lại điều chỉnh hyperparameters (chỉnh model), rồi lại train lại. Quá trình này có thể diễn ra rất nhiều lần. Lưu ý rằng tập $D_{\text{test}}$ chỉ được dùng duy nhất một lần (để đảm bảo rằng nó là unbiased estimator)

Như vậy tập data $\mathcal{D}$ được chia ra thành $D_{\text{train}}$ , $D_{\text{valid}}$ và $D_{\text{test}}$ một cách ngẫu nhiên theo một tỉ lệ nào đó. Trên thực tế, dữ liệu cần dùng để train thường khá lớn, nên tỉ lệ chia $\mathcal{D}$ có thể là 8:1:1 hoặc bất kỳ cách chia nào khác phù hợp với vấn đề đang giải quyết.

Trong trường hợp ta chưa chắc chắn $\mathcal{D}$ có gồm các mẫu độc lập cùng phân phối không, thì ta có thể chia theo thời gian thu thập dữ liệu. Những dữ liệu trước 1 mốc thời gian nào đó sẽ dùng để train (và valid), còn từ đó về sau dữ liệu chỉ dùng để test. Cách chia này vẫn đảm bảo cho ta một unbiased estimator.

## 4. No-free-lunch theorem

Giờ chúng ta đã hiểu cần làm gì ở bài toán supervised learning, đó là thành lập một hypothesis class $\mathcal{H}$, chọn một hàm $\mathcal{L}$ và tìm hàm $h$ tốt nhất từ việc splitting thôi. Tuy nhiên ta có một số lưu ý khi thành lập $\mathcal{H}$ chứ không phải bỏ tất cả các thuật toán có trên đời vào $\mathcal{H}$.

Trước tiên, ta cần biết về No-free-lunch theorem (NFLT).
> **NFL theorem:**
> Ta đã biết rằng $\mathcal{P}$ là một phân bố các điểm $(x, y) \in \mathcal{X} \times \mathcal{Y}$. Thực tế, ta không thể biết rõ được $\mathcal{P}$. Ta gọi tập hợp tất cả các phân bố có thể có là $\mathscr{P}$.
> Xét hai thuật toán (hàm) $h_1$ và $h_2$ bất kỳ, một hàm loss function $\mathcal{L}$. Khi đó:
> 
> $$ \sum_{\mathcal{P} \in \mathscr{P}} \mathcal{L}_{\mathcal{P}}(h_1) = \sum_{\mathcal{P} \in \mathscr{P}} \mathcal{L}_{\mathcal{P}}(h_2) $$

Nôm na là: "Hiệu năng của các thuật toán khi xét trên tất cả các miền khả năng là như nhau". Từ đây, ta suy ra được: một thuật toán mà giỏi ở phân bố này thì dở ở phân bố kia.

Vì vậy, ngay từ đầu, ta phải giả định về một phân bố nào đó cho data của chúng ta. Điều này đòi hỏi ta cần hiểu rõ về tập data. Từ đó ta sẽ chọn những hàm khả thi. Với mỗi hàm khả thi ta cho vào $\mathcal{H}$, ta đang thêm một giả định cho phân bố của data.

## 5. Tổng kết

Sắp xếp mọi thứ lại theo trật tự, ta có quy trình:
1. Thu thập data: cần phải đảm bảo data có những tính chất và phân bố phù hợp
2. Hiểu data: tìm hiểu tốt về data để đưa ra những giả định hợp lý
3. Chọn hypothesis class: dựa trên những giả định ta đặt ra
4. Chọn loss function: dùng khi tập hypothesis class có nhiều hơn 1 phần tử; thường đi kèm với việc chọn thuật toán ở bước 3.
5. Chia tập data: thành 3 tập con $D_{\text{train}}$ , $D_{\text{valid}}$ và $D_{\text{test}}$.
6. Lặp lại việc dùng ( $D_{\text{train}}$ , $D_{\text{valid}}$ ) nhiều lần để chọn ra $h$ tốt nhất, từ đó đem ra dùng với tập $D_{\text{test}}$.

