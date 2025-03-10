---
title: k-nearest neighbors and Curse of Dimensionality
draft: false
date: 2024-06-09 13:52:23 +0700
tags:
  - machine_learning
  - kNN
description: Bài viết này giới thiệu 2 chủ đề. Trước tiên là thuật toán k-nearest neighbors và tập trung chủ yếu về classification. Ngoài ra còn dẫn dắt nói thêm về vấn đề curse of dimensionality
---
## 1. k-nearest neighbors algorithms

Nhắc lại từ bài viết trước: **mọi bài toán machine learning đều cần được một giả định nào đấy để chọn thuật toán hiệu quả cho nó**.

Với thuật toán k-nearest-neighbors (kNN), ta đã đặt ra một giả định rằng: những feature (gần) giống nhau thì có label giống nhau. Với bài toán classification dùng kNN, giả định đó được cụ thể thành: với feature dùng để test $x_t$, thì label của nó chính là label chiếm nhiều nhất trong tập gồm $k$ feature trong dataset gần $x_t$ nhất.


Chính xác hơn, giả sử ta có một tập dữ liệu $\mathcal{D} \subseteq \mathcal{X} \times \mathcal{Y}$. Gọi $x$ là một điểm dữ liệu bất kỳ trong không gian $\mathcal{X} \times \mathcal{Y}$. Cho trước một metric (distance function) $d$, ta gọi $S_x$ là tập hợp gồm $k$ điểm trong $\mathcal{D}$ mà gần $x$ nhất, tức $S_x \in \mathcal{D}$ sao cho $ \mid S_x \mid = k$ và đồng thời:

$$\forall u \in \mathcal{D} \setminus S_x, \; d(x, u) \geq \max_{a, b \in S_x} d(a, b)$$

Khi đó, hàm $h$ - một classifier được định nghĩa là:

$$h(\mathbf{x})=\text{mode}(\{y'':(\mathbf{x}'',y'')\in S_\mathbf{x}\})$$

trong đó $\text{mode}(\cdot)$ là hàm chọn ra label có số lần xuất hiện cao nhất.

Một điểm đáng lưu ý khi sử dụng thuật toán này đó là việc chọn $k$ - gọi là một hyperparameter. Khi chọn $k$ nhỏ, ta có được bias thấp (đánh giá rất sát) và variance cao (nhạy cảm với nhiễu), vì thế rất dễ xảy ra overfitting. Còn khi $k$ lớn thì ngược lại, bias cao (tổng quát hơn) và variance thấp (ít nhạy cảm với nhiễu hơn).

Để trực quan hơn, mình đã viết ra một demo cho kNN ở đây (cập nhật sau khi hoàn thành).

Ngoài ra, kNN có một số các tính chất toán học khác, mình sẽ để dành ở một bài viết khác.

### Metric dùng trong kNN

Metric được sử dụng phổ biến trong kNN chính là **Minkowski distance**:

$$d(\mathbf{x},\mathbf{y})=\left(\sum_{i=1}^n |x_i-y_i|^p\right)^{1/p}, \quad p\geq1$$

Một số trường hợp đặc biệt của $p$:
1. $p = 1$ (Manhattan distance)

$$d(\mathbf{x},\mathbf{y})=\sum_{i=1}^n |x_i-y_i|$$

1. $p=2$ (Euclidean distance)

$$d(\mathbf{x},\mathbf{y})=\sqrt{\sum_{i=1}^n |x_i-y_i|^2}$$

3. $p \to \infty$ (Chebyshev distance)

$$d(\mathbf{x},\mathbf{y})=\max_i (|x_i-y_i|)$$

> Chứng minh cho trường hợp $p \to \infty$:
> Ta có đánh giá:
> $$\left(\max_i(|x_i-y_i|^p)\right)^{1/p} \leq \left(\sum_{i=1}^n |x_i-y_i|^p\right)^{1/p} \leq \left(n\max_i(|x_i-y_i|^p)\right)^{1/p}$$
> 
> Hay:
> $$\max_i(|x_i-y_i|) \leq \left(\sum_{i=1}^n |x_i-y_i|^p\right)^{1/p} \leq \max_i(|x_i-y_i|).n^{1/p}$$
> 
> Để ý $\lim_{p \to \infty} n^{\frac{1}{p}} = 1, \; \forall n \in \mathbb{N*}$, cho $p \to \infty$ trong đánh giá trên, ta có ngay điều phải chứng minh.

Như vậy, ta đã hiểu khá rõ cách kNN classifier hoạt động.

### Ưu nhược điểm:

Ưu điểm của kNN là đơn giản, việc dự đoán kết quả không quá phức tạp và không làm gì ở phần traning data cả. Tuy nhiên nhược điểm chính là mọi tính toán đều nằm ở khâu test, ta cần tính khoảng cách giữa mọi cặp điểm - rất phức tạp khi số dữ liệu và số chiều của dữ liệu lớn. Việc này cũng khiến tốn rất nhiều dung lượng bộ nhớ để lưu dataset (vì khâu test dùng đến cả dataset). Thêm nữa, để chọn cho đúng k cũng là một vấn đề.

Ngoài ra, kNN cũng gặp một vấn đề, là vấn đề chung cho các thuật toán: Curse of Dimensionality.
## 2. Curse of Dimensionality (đọc thêm)

### Phần lớn không gian là rỗng

Nhắc lại về giả định mà ta đặt ra khi dùng kNN: những điểm (gần) giống nhau thì có label như nhau. Cụ thể hơn, thước đo cho sự (gần) giống nhau chính là độ gần, đo bằng metric. Tuy nhiên, khi ở trong một không gian rất nhiều chiều, những điểm trong dataset dường như lại không hề gần nhau.

Để hiểu hơn về curse of dimensionality, ta hãy bắt đầu với 1-d. Không mất tính tổng quát, giả sử ta có các điểm dữ liệu phân bố đều và độc lập, nằm trên đoạn $[0;1]$. Ở hai đầu biên, ta gọi 2 khoảng $\varepsilon > 0$ như hình dưới là _rìa_.

![curse of 1d dark mod](https://raw.githubusercontent.com/nhatquang510/media/main/vtqn-blog/Attachments/curse-of-1d(dark).png){: .dark }
![curse of 1d light mode](https://raw.githubusercontent.com/nhatquang510/media/main/vtqn-blog/Attachments/curse-of-1d(light).png){: .light }

Rõ ràng, xác suất mà điểm dữ liệu đã cho **không nằm ở rìa** là $1-2\varepsilon$. Với $\varepsilon$ rất nhỏ, ta thấy _một cách trực quan_ rằng rất khó để mà data của chúng ta nằm ở rìa.

Giờ hãy xét ở 2-d, khi đó data của chúng ta là phân bố đều và nằm ở trong $[0;1]^2$.

![curse of 2d dark mod](https://raw.githubusercontent.com/nhatquang510/media/main/vtqn-blog/Attachments/curse-of-2d(dark).png){: .dark }
![curse of 2d light mode](https://raw.githubusercontent.com/nhatquang510/media/main/vtqn-blog/Attachments/curse-of-2d(light).png){: .light }

Ta thấy _một cách trực quan_ rằng có vẻ như xác suất mà data của chúng ta không nằm ở rìa có vẻ hơi giảm đi. Thật vậy, tỉ lệ phần không bị gạch (rìa) với toàn diện tích hình vuông là $(1-2\varepsilon)^2$.

Vậy sẽ như nào nếu số chiều $d$ rất lớn ($d \gg 0$) ? Khi đó, xác suất mà data của chúng ta không nằm ở rìa chính là $(1-2\varepsilon)^d \to 0$, tức là **phần lớn data sẽ nằm ở rìa**.

### Sự mất ý nghĩa của khoảng cách

> Hệ quả của việc không gian phần lớn là rỗng chính là **_phần lớn_ khoảng cách giữa 2 điểm bất kỳ là rất giống nhau** (đều là khoảng cách từ đầu này đến đầu kia).
{: .prompt-danger }

Để hiểu hệ quả trên một cách trực quan quan hơn, ta lấy ví dụ trong không gian 2 chiều tiếp. **Giả sử** các điểm dữ liệu của ta đều ở biên và phân bố đều. Lấy 1 điểm màu đỏ nằm ở rìa, rõ ràng quá nửa số data nằm xa điểm màu đỏ (bên ngoài đường tròn đỏ), tức là quá nửa khoảng cách tới điểm đỏ nằm trong khoảng $[r;\sqrt{2}]$.

![metric becomes less meaningfull dark mod](https://raw.githubusercontent.com/nhatquang510/media/main/vtqn-blog/Attachments/lessmeaning-metric-of-2d(dark).png){: .dark }
![metric becomes less meaningfull light mode](https://raw.githubusercontent.com/nhatquang510/media/main/vtqn-blog/Attachments/lessmeaning-metric-of-2d(light).png){: .light }

Từ ví dụ 2d này, ta hãy nghĩ rằng khi tăng số chiều lên, hiệu ứng này nó sẽ lớn hơn rất nhiều, là **quá nửa số khoảng cách sẽ nằm trong 1 khoảng không gian rất là nhỏ.** Như vậy, khi $d$ rất lớn, giả định của kNN hoàn toàn bị sụp đổ vì lúc này **khoảng cách trở nên dần không còn ý nghĩa** để phân biệt.
>Ví dụ, bạn ở Hà Nội và 5 người gần nhất với bạn lần lượt ở Hòa Bình, Đà Nẵng và 3 người ở Hồ Chí Minh. Nếu như dùng 5-NN, thì khẳng định rằng bạn giống với 3 người ở HCM là không hợp lý chút nào. 

Dưới đây là biểu đồ minh họa cho sự phân bố của các khoảng cách của một tập dữ liệu phân bố đều trong các không gian.

![distance when d is large](https://www.cs.cornell.edu/courses/cs4780/2024sp/lectures/images/c2/cursefigure.png)
_Phân bố khoảng cách giữa 2 cặp điểm khi $d$ lớn_

Chứng minh toán học cho hiện tượng này ở đây: (cập nhật sau khi hoàn thiện).

Như vậy, kNN hoàn toàn không thể ứng dụng trong thực tế ư? Bởi số chiều của data trong thực tế là rất lớn.
> Ví dụ như với một tập các hình ảnh hoa oải hương có kích thước 100x100, số chiều của dữ liệu là 30 000 (giả sử mỗi điểm là 1 bộ 3 (r,g,b) ).

Thật ra không phải là không ứng dụng được. Bởi với curse of dimensionality, data là phân bố đều và độc lập. Còn thực tế, data của chúng ta không hề phân bố đều mà nằm trong một mặt phẳng (hoặc là một manifold) có $n$ chiều nào đó mà $n$ nhỏ hơn $d$ rất nhiều. Lúc này, **khoảng cách không bị mất đi ý nghĩa do sự tăng số chiều nữa.**

> Manifold là một khái niệm topology, có thể hiểu nôm na là khi ta nhìn cục bộ thì rất giống với không gian $n$ chiều. Ví dụ như chúng ta đang ở Trái Đất, một vật thể 3d. Nhưng chúng ta chỉ di chuyển trên bề mặt Trái Đất và Trái Đất quá lớn so với chúng ta, nên nhìn cục bộ có vẻ như Trái Đất phẳng (2d).



![Data on manifold](https://www.wolfram.com/language/12/high-level-machine-learning/assets.en/learn-a-nonlinear-manifold-on-numeric-data/O_43.png)
_Ví dụ về data nằm trên một manifold_

Lấy lại ví dụ với tập ảnh hoa oải hương, mỗi hoa oải hương đều có cấu trúc tương tự nhau như cánh hoa nhỏ màu tím nằm thành chùm trên cành xanh dài mảnh, tạo cảm giác nhẹ nhàng, cánh đồng oải hương thì tím bạt ngàn,... Vì thế data của chúng ta sẽ nằm trên một manifold nào đó chứ không phân bố ngẫu nhiên được. Do đó kNN vẫn có thể áp dụng được.

Thật ra, một ý tưởng rất hiển nhiên để giải quyết curse of dimensionality chính là tìm cách giảm số chiều xuống. Có nhiều kỹ thuật để làm điều này và sẽ được bàn trong một (vài) bài viết trong tương lai.

## Đọc thêm:

- [kNN lần đầu được giới thiệu(1951)](https://cs.nyu.edu/~roweis/csc2515-2006/readings/fix_hodges_51.pdf)
- [được mở rộng thêm (1967)](https://isl.stanford.edu/~cover/papers/transIT/0021cove.pdf)