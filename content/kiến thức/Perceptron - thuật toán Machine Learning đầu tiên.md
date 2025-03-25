---
title: Perceptron - thuật toán Machine Learning đầu tiên
draft: false
date: 2024-06-14 10:02:08 +0700
tags:
  - machine_learning
description: Bài viết giới thiệu thuật toán Perceptron và từng bước xây dựng thuật toán. Ngoài ra, bài viết còn có các chứng minh một số tính chất liên quan.
---
## 1. Giới thiệu về Perceptron
### Cảm hứng

Perceptron chính là thuật toán machine learning đầu tiên. Nó được lấy cảm hứng từ chức năng của những neuron trong não.

![](https://media.licdn.com/dms/image/D5612AQGBtrdY8vackA/article-cover_image-shrink_720_1280/0/1703985040340?e=2147483647&v=beta&t=G7ixFwJLFYestaSQI_7ANB8LVOjxhPcwBBEuRApRy-w)
_Minh họa cho Perceptron_

Nôm na, một neuron có thể nhận được tín hiệu từ các neuron khác, và dựa vào đó để ra quyết định là nó sẽ truyền tín hiệu đi hay không. Ở bản _perceptron_ đầu tiên, thuật toán này nhận các số có giá trị là 0 hoặc 1 (nhận được hay không) và cho ra kết quả là 0 hoặc 1 (truyền đi dữ liệu hay không).

Ta có thể xét ví dụ sau:
![perceptron](https://www.w3schools.com/ai/img_perceptron.jpg)
_Ví dụ về perceptron_

Ta có các input $x_1, x_2, x_3, x_4, x_5$, và các hệ số $w_1, w_2, w_3, w_4, w_5$. Ta đi tính giá trị 
$$T = x_1w_1 + x_2w_2 + x_3w_3 + x_4w_4 + x_5w_5$$

Nếu $T \geq t$ ($t$ là một ngưỡng nào đó) thì ta sẽ truyền đi dữ liệu (output là 1), còn ngược lại thì không (output là 0).

> Ta lấy ví dụ với ngưỡng $t=10$, $(x_1, x_2, x_3, x_4, x_5) = (1,0,1,0,1)$ và $(w_1, w_2, w_3, w_4, w_5) = (1,2,3,4,5)$. Khi đó $T = 1 \times 1 + 0 \times 2 + 1 \times 3 + 0 \times 4 + 1 \times 5 = 9$. Như vậy, output là $0$.

Sau này, perceptron đã được tổng quát hơn khi ta có thể cho vào các giá trị thực chứ không chỉ là 0 hoặc 1 (đầu ra vẫn là 1 trong 2 kết quả). Như vậy, Perceptron là một thuật toán supervised learning, cụ thể hơn chính là một binary classifier.

### Linearly Separable

Trước khi đến phần tiếp theo, mình xin nhắc lại: mọi thuật toán Machine Learning khi được áp dụng cần có một giả định nào đó cho dữ liệu. Với Perceptron, ta dùng nó khi ta giả định dữ liệu có các tính chất:
- Có 2 class (Binary classification)
- Linearly separable.

Linearly separable nôm na có nghĩa là **tồn tại** một _hyperplane_ có thể chia dữ liệu của chúng ta thành 2 nhóm, mỗi nhóm nằm hoàn toàn ở một phía của _hyperplane_.
> Hyperplane của không gian $n$ chiều là một không gian con của nó có $n-1$ chiều. Ví dụ, đường thẳng (1d) là hyperplane của mặt phẳng, mặt phẳng là hyperplane trong không gian 3d.

![Ví dụ về linearly separable](https://www.researchgate.net/publication/370634232/figure/fig4/AS:11431281157036795@1683688796070/Linearly-separable-and-linearly-non-separable-sets-githuborg.ppm)
_Ví dụ về linearly separable_

Rõ ràng, với giả định như thế, để phân loại dataset thì ta chỉ cần tìm cho ra một hyperplane thỏa mãn là xong. Và đó cũng chính là output của Perceptron, một hyperplane chia tách 2 class.

Sau đây ta sẽ lần lượt xây dựng vào giải quyết bài toán **Perceptron**.

## 2. Bài toán Perceptron

### Phát biểu bài toán
Cho một dataset 
$$\mathcal{D} = \left\{ (x_i, y_i) | x_i \in \mathcal{X}, y_i \in \mathcal{Y}, i = \overline{1, n} \right\} $$trong đó $\mathcal{X} \subseteq \mathbb{R}^d,\; \mathcal{Y} = \\{ -1, +1 \\}$

Dựa trên dataset trên, ta muốn tìm các hệ số $w^{(1)}, w^{(2)}, \dots, w^{(d)}, t$  sao cho:

$$\forall i = \overline{1, n}: x_i^{(1)}w^{(1)} + x_i^{(2)}w^{(2)} + \dots, x_i^{(d)}w^{(d)} \geq t \iff y_i = 1$$

Hay 

$$\forall i = \overline{1, n}: w^Tx_i - t \geq 0 \iff y_i = 1$$[^1]

Như vậy, ta cần tìm một model $h$ có dạng $h(x) = \mathrm{sign}(w^Tx - t)$. Lưu ý rằng $w^Tx - t = 0$ là phương trình của một hyperplane có vector pháp tuyến là $w$, nên có thể nói rằng ta đang tìm một hyperplane.

> Một tính chất toán học đã được giới thiệu qua (với trường hợp 2d và 3d) ở chương trình(2008) toán cấp 2, cấp 3 chính là: tất cả những điểm nằm ở **cùng một phía** của một hyperplane $f(x) = 0$ khi thay vào $f(x)$ đều cho ra các giá trị có cùng dấu.

### Đơn giản hóa

Có một trick để ta làm cho bài toán đơn giản hơn. Ta sẽ thay $x_i \leftarrow (x_i^{(1)}, x_i^{(2)}, \dots, x_i^{(d)}, 1)$. Khi đó, phát biểu lại bài toán, ta chỉ cần tìm vector $w = (w^{(1)}, w^{(2)}, \dots, w^{(d)}, -t)$ sao cho
$$\forall i = \overline{1, n}: w^Tx_i \geq 0 \iff y_i = 1$$
Tức là ta tăng số chiều dữ liệu lên 1 để giúp biểu thức đơn giản hơn. Một cách trực quan, điều này tức là chúng ta chỉ cần đi tìm các *hyperplane* đi qua gốc tọa độ.

![Minh họa cho trick](https://www.cs.cornell.edu/courses/cs4780/2024sp/lectures/images/Perceptron/PconstantDim.png)
_Minh họa hình học cho trick trên_

Tóm lại, ta chỉ cần tìm vector pháp tuyến $w$.

### Thuật toán

Đầu tiên ta cứ chọn $w$ là một vector bất kỳ.
Ý tưởng của thuật toán Perceptron là lặp lại 2 việc sau đến khi tìm được $w$:
1. Tìm một điểm M chưa được phân loại đúng
2. Điều chỉnh vector pháp tuyến sao cho $M$ về gần (hoặc là về luôn) đúng phía mà nó thuộc về. 

Ta sẽ xử lý ý 2 như sau:

Đầu tiên, chú ý rằng: 
- Một điểm $(x, y)$ chưa được phân loại đúng, tức là $w^Tx$ và $y$ không cùng dấu, hay $w^Tx.y \leq 0$, kéo theo $w^T(yx) \leq 0$, đồng nghĩa với việc góc giữa 2 vector $w^T$ và $yx$ là góc có số đo không bé hơn $90^{\circ}$.
- Ngược lại, nếu được phân loại đúng thì $w^Tx.y > 0$, hay góc giữa 2 vector $w^T$ và $yx$ là góc có số đo bé hơn $90^{\circ}$.

Như vậy, ta cần điều chỉnh sao cho góc giữa 2 vector $w^T$ và $yx$ bé dần.

![[IMG_0234.png]]

_w* là vector đích, w là vector chúng ta cần điều chỉnh_

Để làm được điều đó, ta thấy rằng chỉ cần di chuyển $w$ thành một $w_{\text{new}}$ nằm giữa $w$ và $yx$ là xong. Khi đó, $w_{\text{new}} = aw + byx$ với $a, b >0$ nào đó (thật ra không phải bộ số $a, b$ nào cũng thỏa mãn, chứng minh ở dưới). Với thuật toán Perceptron, người ta đã chọn $w_{\text{new}} = w + yx$, điều này đảm bảo sau một số bước, $x$ sẽ về đúng phía mà nó thuộc về.

Tóm lại, ta có pseudocode như sau:

```python
# Perceptron
w = 0
while True:
    isClassified = True
	
    for (x_i, y_i) in D:
        if y_i(x_i.w) <= 0:
            w = w + y_i * x_i # updating step
            isClassified = False
	
    if is Classified == True: break
```

Phần chứng minh cho việc **thuật toán này dừng** sẽ được trình bày ở phần sau.

Hãy tham khảo thêm về demo của perceptron ở [đây](https://phiresky.github.io/kogsys-demos/neural-network-demo/?preset=Rosenblatt%20Perceptron).
## 3. Các chứng minh cho phát biểu ở trên (đọc thêm)

### Chứng minh 1:

> Nói lại, ta cần cập nhật vector $w$ thành vector $w_{\text{new}} = aw + byx$ với $a, b >0$ nào đó sao cho **sau một số bước thì góc giữa 2 vector $w$ và $yx$ có số đo nhỏ hơn $90^{\circ}$.**  Đấy chính là mấu chốt. Tuy nhiên không phải $a, b$ nào cũng có thể được chọn. Sau đây ta sẽ tìm những bộ thỏa mãn.

Xét điểm $(x, y)$ cố định, và hiện đang bị phân loại chưa đúng. Ta có

$$w_{\text{new}}^T.(yx) = (aw + byx)^T(yx) = aw^T(yx) + by^2||x||_2^2$$

Đặt $M = a > 0$, $\varepsilon = by^2\lVert x \rVert_2^2 \geq 0$, như vậy ta có thể xét dãy số $(u_n)$ thỏa mãn: $u_0 = w^T(yx) \leq 0$, đồng thời

$$
\begin{equation}
	u_{n+1} = Mu_n + \varepsilon, \; \forall n \in \mathbb{N}
\end{equation}
$$

Rõ ràng dãy số này biểu thị giá trị của đại lượng $w^T(yx)$ sau mỗi bước cập nhật cho điểm $(x, y)$.
Từ mệnh đề trên, ta có:

$$
	u_{n+1} + \frac{\varepsilon}{M-1} = M \left( u_n + \frac{\varepsilon}{M-1} \right),\; \forall n \in \mathbb{N}, M \neq 1
$$

Kéo theo:

$$
		u_{n} = M^n \left( u_0 + \frac{\varepsilon}{M-1} \right) - \frac{\varepsilon}{M-1}
$$

Xét riêng với $M = 1$ thì:

$$
	u_n = u_0 + n\varepsilon, \; \forall n \in \mathbb{N}
$$

Từ đây, ta có các nhận xét:
- Nếu $0<M<1$ hoặc $u_0 + \frac{\varepsilon}{M-1} = 0$ thì $\lim u_n = \frac{\varepsilon}{1-M} >0$, tức là sẽ có lúc nào đó $u_n > 0$.
- Nếu $M = 1$ thì $\lim u_n = + \infty$, tức là cũng sẽ đến lúc $u_n>0$.
- Nếu $M > 1$:
    - Nếu $u_0 + \frac{\varepsilon}{M-1} >0$ thì $\lim u_n = +\infty$, tức là cũng sẽ đến lúc $u_n>0$.
    - Nếu $u_0 + \frac{\varepsilon}{M-1} <0$ thì dễ dàng chỉ ra $u_1 < u_0 < 0$, mặt khác ta cũng dễ chỉ ra $(u_n)$ là dãy đơn điệu (do $M>0$) nên $(u_n)$ là dãy giảm. Do đó không thể có $n$ để $u_n > 0$

Như vậy, trong thuật toán Perceptron, ta chỉ cần chọn $0 < a = M \leq 1$ là thuật toán sẽ hoạt động, còn nếu lấy $M > 1$ thì phải chọn $\varepsilon$ cho phù hợp.

### Chứng minh 2 (Novikoff):

Ta sẽ chứng minh thuật toán được phát biểu bằng pseudocode ở trên dừng bằng phản chứng.

Giả sử, thuật toán trên không dừng, tức là với mọi số nguyên dương $n$ thì ở lần lặp thứ $n$ luôn tồn tại một điểm $x_n$ bị phân loại sai. Ta gọi $w_0 = 0$ chính là $w$ lúc khởi tạo, gọi $w_n$ là vector pháp tuyến ở ngay lúc bắt đầu vòng lặp thứ $n$ ($n \in \mathbb{N}^*$).
Khi đó $w_n^T(y_nx_n) \leq 0, \; \forall n \in \mathbb{N}$. (1)

Vì dữ liệu của chúng ta là linearly separable, nên tồn tại hyperplane có vector pháp tuyến $w_c$ mà phân loại đúng, tức là $w_c^T.(yx) \geq 0, \; \forall (x, y) \in \mathcal{D}$ . (2). Không mất tính tổng quát giả sử $\lVert w_c\rVert_2 = 1$.

Ta có $w_{n+1} = w_n + y_nx_n, \; \forall n \in \mathbb{N}$ (3). Chú ý (2), ta được:

$$
\begin{align*}
	\forall n \in \mathbb{N}: w_{n+1}^Tw_c &= w_n^Tw_c + w_c^T(y_nx_n) \\
										   &= w_n^Tw_c + |w_c^T(y_nx_n)| \\
										   &= w_n^Tw_c + |w_c^Tx_n| \quad (|y_n| = 1) \\
										   &\geq w_n^Tw_c + \gamma
\end{align*}
$$

với $\gamma = \min_{(x,y) \in D} \lvert w_c^Tx \rvert > 0$. Kéo theo $w_n^Tw_c \geq w_0^Tw_c + n\gamma = n\gamma, \; \forall n \in \mathbb{N}$. (4)

Mặt khác, ta cũng có $w_n^Tw_c \leq \lVert w_n \rVert_2.\lVert w_c \rVert_2 = \lVert w_n \rVert_2, \; \forall n \in \mathbb{N}$ (Cauchy-Schwarz). Vì thế ta sẽ tìm cách đánh giá một cận trên cho $\lVert w_n \rVert_2$.

Từ (3) ta cũng có:

$$
\begin{align*}
	\forall n \in \mathbb{N}: w_{n+1}^2 &= (w_n + y_nx_n)^2 \\
											  &= w_n^2 + 2w^T_n(y_nx_n)+(y_nx_n)^2\\
											  &\leq w_n^2 + x_n^2 \\
											  &= w_n^2 + R^2										  
\end{align*}
$$

với $R = \max_{(x,y) \in D} ||x||_2 > 0$. Biến đổi dòng thứ 3 là nhờ (1). Từ đây ta suy ra $w_n^2 \leq w_0^2+nR = nR$, kéo theo $||w_n||_2 \leq= \sqrt{nR}$.
Như vậy $w_n^Tw_c \leq \sqrt{nR}, \; \forall n \in \mathbb{N}$ (5).

Từ (4) và (5), suy ra: $\forall n \in \mathbb{N}: n\gamma \leq \sqrt{nR}$, tương đương với $\forall n \in \mathbb{N}: n \leq \frac{R}{\gamma^2}$(vô lý). Như vậy điều giả sử là sai. Vậy thuật toán sẽ dừng.
## Các bài báo có thể đọc thêm

 - [Bài báo đầu tiên cung cấp các lý thuyết toán học nền tảng cho perceptron (1943)](https://www.cs.cmu.edu/~epxing/Class/10715/reading/McCulloch.and.Pitts.pdf)
 - [Lần đầu trình bày thuật toán perceptron(1957)](https://bpb-us-e2.wpmucdn.com/websites.umass.edu/dist/a/27637/files/2016/03/rosenblatt-1957.pdf)
 - [Chi tiết và mở rộng hơn paper năm 1957 ở trên(1958)](https://www.ling.upenn.edu/courses/cogs501/Rosenblatt1958.pdf)
 - [Sách Perceptrons(1969)](https://votaquangnhat.wordpress.com/wp-content/uploads/2024/06/marvin-minsky-seymour-papert-perceptrons-an-introduction-to-computational-geometry-mit-press-1969.pdf)



[^1]: Ta ký hiệu tích vô hướng của 2 vector $w$ và $x$ là $w^Tx$. 