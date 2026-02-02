---
title: Numpy cheat sheet
draft: false
date: 2025-03-29 14:37:21 +0700
tags:
  - comsci
---
### Numpy array creation

```python
np.array(python_list)
np.zeros(n) or np.zero(python_tuple)
np.ones(n)
np.full()
np.arange(min, max, step)
np.random.rand(n)
np.empty(n)
```

### Numpy array indexing

```python
arr[0] = 3.0 # if arr's dimension is > 2, then all the numbers in arr[0] will = 3.0
```

### Numpy function

``` python
np.where(condition, x, y)
```

### numpy operation

```python
np.add(u, v) # u + v
np.substract(u, v) # u - v
np.divide(v, u) # v/u, there are also v//u and v%u
u * alpha # alpha is a scalar
np.multiply(u, v) # u*v, this is Hadamard product
```