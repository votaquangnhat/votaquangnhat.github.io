# Set Theory & Logic — Complete Solutions (Levels 0–3)

Below are full, step-by-step solutions for every exercise in Levels 0 through 3.  
Each claim is proved element-wise (or a counterexample is given when false).  
Copy-paste ready.

---

# LEVEL 0 — Understanding the Language of Sets

## A. Vocabulary — translate to words

1. $x \in A \cap B$  
   — *x is an element of both $A$ and $B$.* (x is in $A$ **and** x is in $B$.)

2. $x \in A \cup B$  
   — *x is an element of $A$ or $B$ (or both).* (inclusive or)

3. $x \in A - B$  
   — *x is in $A$ and not in $B$.*

4. $x \in A'$  
   — *x is not in $A$.* ($A'$ is the complement of $A$ relative to the universe $U$.)

5. $A \subseteq B$  
   — *Every element of $A$ is also an element of $B$.* (For all $x$, $x\in A \Rightarrow x\in B$.)

6. $A = B$  
   — *$A$ and $B$ have exactly the same elements.* (Both $A\subseteq B$ and $B\subseteq A$.)

7. $A \nsubseteq B$  
   — *$A$ is not a subset of $B$; there exists some $x\in A$ with $x\notin B$.*

8. $\emptyset \subseteq A$  
   — *The empty set is a subset of every set.* (Trivially true: no counterexamples.)

9. $U$ (universal set)  
   — *The universe of discourse: the set that contains all elements under consideration.*

10. $A \times B$  
    — *Cartesian product: $\{(a,b)\mid a\in A,\ b\in B\}$.*

---

## B. Translate between logic and sets (explanations)

1. $x \in A \cap B \iff (x\in A)\land(x\in B)$.  
   — Intersection corresponds to logical **and**.

2. $x \in A \cup B \iff (x\in A)\lor(x\in B)$.  
   — Union corresponds to logical **or** (inclusive).

3. $x \in A - B \iff (x\in A)\land\neg(x\in B)$.  
   — Set difference is “in $A$ and not in $B$.”

4. $x \in A' \iff \neg(x\in A)$.  
   — Complement is logical **not**.

5. $A \subseteq B \iff \forall x\,(x\in A\Rightarrow x\in B)$.

6. $A = B \iff (A\subseteq B)\land(B\subseteq A)$.

7. If $A\subseteq B$ and $B\subseteq C$, then $A\subseteq C$.  
   — Subset is transitive: for any $x$, $x\in A\Rightarrow x\in B\Rightarrow x\in C$.

8. If $A\subseteq B'$, then $A\cap B=\emptyset$.  
   — Every $x\in A$ is not in $B$, so no element is common.

9. If $x\notin A\cup B$, then $x\notin A$ **and** $x\notin B$.  
   — Negation of union: $\neg(p\lor q)\iff\neg p\land\neg q$.

10. If $x\in (A\cap B)'$, then $x\notin A$ **or** $x\notin B$.  
    — Negation of intersection: $\neg(p\land q)\iff\neg p\lor\neg q$.

---

## C. Concept check — short answers / examples

1. Example with strict subset: $A=\{1\},\ B=\{1,2\}$. Then $A\subseteq B$ but $A\ne B$.

2. Can a set be a subset of itself? — Yes. For every set $A$, $A\subseteq A$.

3. Complement of the empty set: $\emptyset' = U$ (everything in the universe).

4. $A - A = \emptyset$.

5. $A \cap \emptyset = \emptyset$.

6. $A \cup U = U$.

7. If $A\subseteq B$, then $B' \subseteq A'$. (Complements reverse inclusion.)

8. Visualizing $A - B$: the part of $A$ lying outside $B$ on a Venn diagram.

9. Yes. Example: $A=\{1\},\ B=\{2\}$. Then $A\cap B=\emptyset$ but $A\cup B=\{1,2\}\neq\emptyset$.

10. $A\subseteq B$ allows $A=B$; $A\subset B$ usually denotes a **proper** subset (i.e. $A\subseteq B$ and $A\ne B$).

---

# LEVEL 1 — Foundations: unions, intersections, complements

For subset claims we give element-wise proofs. For equalities show both inclusions.

### 1. $A \cap B \subseteq A$

**Proof.** Let $x\in A\cap B$. Then $x\in A$ and $x\in B$. So $x\in A$. Thus $A\cap B\subseteq A$. ∎

---

### 2. $A \subseteq A \cup B$

**Proof.** Let $x\in A$. Then $x\in A$ or $x\in B$ holds (left disjunct true), so $x\in A\cup B$. Hence $A\subseteq A\cup B$. ∎

---

### 3. $A \subseteq A$

**Proof.** Trivial: every $x\in A$ is in $A$. ∎

---

### 4. $A \cup \emptyset = A$

**Proof.**  
- If $x\in A\cup\emptyset$, then $x\in A$ or $x\in\emptyset$. Since no element is in $\emptyset$, $x\in A$. So $A\cup\emptyset\subseteq A$.  
- If $x\in A$, then $x\in A\cup\emptyset$. So $A\subseteq A\cup\emptyset$.  
Thus equality. ∎

---

### 5. $A \cap U = A$

**Proof.**  
- If $x\in A\cap U$ then $x\in A$. So $A\cap U\subseteq A$.  
- If $x\in A$ then $x\in U$, so $x\in A\cap U$. So $A\subseteq A\cap U$.  
Hence equality. ∎

---

### 6. $(A')' = A$

**Proof.** $x\in (A')' \iff \neg(x\in A') \iff \neg(\neg(x\in A)) \iff x\in A$. So $(A')'=A$. ∎

---

### 7. $(A \cup B)' = A' \cap B'$ (De Morgan)

**Proof.** For any $x$,
$$
x\in (A\cup B)' \iff \neg(x\in A\cup B) \iff \neg\big((x\in A)\lor(x\in B)\big)
$$
$$
\iff \neg(x\in A)\land\neg(x\in B) \iff x\in A'\cap B'.
$$
Thus equality. ∎

---

### 8. $(A \cap B)' = A' \cup B'$ (De Morgan)

**Proof.** For any $x$,
$$
x\in (A\cap B)' \iff \neg(x\in A\cap B) \iff \neg\big((x\in A)\land(x\in B)\big)
$$
$$
\iff \neg(x\in A)\lor\neg(x\in B) \iff x\in A'\cup B'.
$$
Thus equality. ∎

---

### 9. $A \cup (B \cap C) \subseteq (A \cup B) \cap (A \cup C)$

**Proof.** Let $x\in A\cup(B\cap C)$. Two cases:

- If $x\in A$, then $x\in A\cup B$ and $x\in A\cup C$, so $x\in (A\cup B)\cap(A\cup C)$.  
- If $x\in B\cap C$, then $x\in B$ and $x\in C$, so $x\in A\cup B$ and $x\in A\cup C$.

Thus $A\cup(B\cap C)\subseteq (A\cup B)\cap(A\cup C)$. (Equality holds; see Level 2.) ∎

---

### 10. $(A \cap B) \cup (A \cap C) \subseteq A \cap (B \cup C)$

**Proof.** Let $x\in (A\cap B)\cup(A\cap C)$.  
If $x\in A\cap B$ then $x\in A$ and $x\in B$, hence $x\in A$ and $x\in B\cup C$ so $x\in A\cap(B\cup C)$.  
The $A\cap C$ case is identical. Thus the inclusion holds. (Equality holds; see Level 2.) ∎

---

# LEVEL 2 — Moderate: distributing, simplifying, relating

### 1. $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$

**Proof.**  
- $(\subseteq)$ If $x\in A\cap(B\cup C)$ then $x\in A$ and $x\in B\cup C$. So $x\in B$ or $x\in C$.  
  If $x\in B$ then $x\in A\cap B$; if $x\in C$ then $x\in A\cap C$. Hence $x\in(A\cap B)\cup(A\cap C)$.  
- $(\supseteq)$ If $x\in(A\cap B)\cup(A\cap C)$, then either $x\in A\cap B$ or $x\in A\cap C$. In either case $x\in A$ and $x\in B\cup C$, so $x\in A\cap(B\cup C)$.

Thus equality. ∎

---

### 2. $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$

**Proof.**  
- $(\subseteq)$ If $x\in A\cup(B\cap C)$, either $x\in A$ (then obviously in both $A\cup B$ and $A\cup C$) or $x\in B\cap C$ (then in both $A\cup B$ and $A\cup C$). So $x\in (A\cup B)\cap(A\cup C)$.  
- $(\supseteq)$ If $x\in (A\cup B)\cap(A\cup C)$ then $x\in A\cup B$ and $x\in A\cup C$. If $x\in A$ we are done.  
  If not, then from $x\in A\cup B$ we get $x\in B$, and from $x\in A\cup C$ we get $x\in C$. Hence $x\in B\cap C$.  
  So $x\in A\cup(B\cap C)$.

Thus equality. ∎

---

### 3. If $A \subseteq B$, prove $A \cap C \subseteq B \cap C$

**Proof.** Let $x\in A\cap C$. Then $x\in A$ and $x\in C$. From $A\subseteq B$, $x\in B$. So $x\in B\cap C$. ∎

---

### 4. If $A \subseteq B$, prove $A - C \subseteq B - C$

**Proof.** Let $x\in A-C$. Then $x\in A$ and $x\notin C$. Since $A\subseteq B$, $x\in B$. Hence $x\in B-C$. ∎

---

### 5. $A - (B \cup C) = (A - B) \cap (A - C)$

**Proof.** For any $x$:
$$
x\in A-(B\cup C)\iff x\in A\land\neg(x\in B\lor x\in C)
$$
$$
\iff x\in A\land(x\notin B)\land(x\notin C)
$$
$$
\iff x\in(A-B)\land x\in(A-C)\iff x\in(A-B)\cap(A-C).
$$
Thus equality. ∎

---

### 6. $A - (B \cap C) = (A - B) \cup (A - C)$

**Proof.** For any $x$:
$$
x\in A-(B\cap C)\iff x\in A\land\neg(x\in B\land x\in C)
$$
$$
\iff x\in A\land(x\notin B\ \text{or}\ x\notin C)
$$
$$
\iff (x\in A\land x\notin B)\ \text{or}\ (x\in A\land x\notin C)
$$
$$
\iff x\in(A-B)\ \text{or}\ x\in(A-C)\iff x\in(A-B)\cup(A-C).
$$
Thus equality. ∎

---

### 7. $(A \cup B) - C = (A - C) \cup (B - C)$

**Proof.** For any $x$,
$$
x\in(A\cup B)-C\iff x\in A\cup B\land x\notin C
$$
$$
\iff (x\in A\land x\notin C)\ \text{or}\ (x\in B\land x\notin C)
$$
$$
\iff x\in(A-C)\ \text{or}\ x\in(B-C)\iff x\in(A-C)\cup(B-C).
$$
Thus equality. ∎

---

### 8. $(A \cap B) - C = (A - C) \cap (B - C)$

**Proof.** For any $x$,
$$
x\in(A\cap B)-C\iff x\in A\cap B\land x\notin C
$$
$$
\iff (x\in A\land x\notin C)\land(x\in B\land x\notin C)
$$
$$
\iff x\in(A-C)\land x\in(B-C)\iff x\in(A-C)\cap(B-C).
$$
Thus equality. ∎

---

### 9. Prove/disprove: $A \subseteq (A \cup B) \cap (A \cup B')$

**Solution.** True. In fact equality holds:  
Use the distributive identity
$$
(X\cup Y)\cap(X\cup Z) = X\cup(Y\cap Z).
$$
Set $X=A,\ Y=B,\ Z=B'$. Then
$$
(A\cup B)\cap(A\cup B') = A\cup(B\cap B').
$$
But $B\cap B'=\emptyset$, so the right-hand side is $A\cup\emptyset = A$.  
Thus the RHS equals $A$, proving $A\subseteq$ RHS (indeed equality). ∎

---

### 10. Simplify $(A' \cup B')'$

**Solution.** By De Morgan and double complement:
$$
(A'\cup B')' = A''\cap B'' = A\cap B.
$$
So $(A'\cup B')' = A\cap B$. ∎

---

# LEVEL 3 — Advanced: Chaining Multiple Relations

### 1. $A \cap (B - C) = (A \cap B) - C$

**Proof.**  
For any $x$,
$$
x \in A \cap (B - C) \iff x \in A \land x \in B \land x \notin C
$$
$$
\iff x \in A \cap B \land x \notin C \iff x \in (A \cap B) - C.
$$
Thus equality. ∎

---

### 2. $(A - B) \cap C = (A \cap C) - B$

**Proof.**  
For any $x$,
$$
x \in (A - B) \cap C \iff x \in A \land x \notin B \land x \in C
$$
$$
\iff x \in A \cap C \land x \notin B \iff x \in (A \cap C) - B.
$$
Thus equality. ∎

---

### 3. $A - (B - C) = (A - B) \cup (A \cap C)$

**Proof.**  
For any $x$,
$$
x \in A - (B - C) \iff x \in A \land \neg(x \in B \land x \notin C)
$$
$$
\iff x \in A \land (x \notin B \lor x \in C)
$$
$$
\iff (x \in A \land x \notin B) \lor (x \in A \land x \in C)
$$
$$
\iff x \in (A - B) \lor x \in (A \cap C) \iff x \in (A - B) \cup (A \cap C).
$$
Thus equality. ∎

---

### 4. $(A \cap B) - (A \cap C) \subseteq A \cap (B - C)$

**Proof.**  
Let $x \in (A \cap B) - (A \cap C)$.  
Then $x \in A \cap B$ and $x \notin A \cap C$.  
From $x \in A \cap B$ we have $x \in A$ and $x \in B$.  
Since $x \notin A \cap C$, $\neg(x \in A \land x \in C)$, i.e. $x \notin A$ or $x \notin C$.  
But $x \in A$, so $x \notin C$.  
Hence $x \in A$ and $x \in B$ and $x \notin C$, meaning $x \in A \cap (B - C)$.  
So the inclusion holds. ∎

---

### 5. $A \cap (B - C) \subseteq (A \cap B) - (A \cap C)$

**Proof.**  
Let $x \in A \cap (B - C)$.  
Then $x \in A$, $x \in B$, and $x \notin C$.  
From $x \notin C$ we deduce $x \notin A \cap C$.  
Also $x \in A \cap B$.  
Therefore $x \in (A \cap B) - (A \cap C)$.  
So the inclusion holds.

Combining with item 4, we get equality:
$$
(A \cap B) - (A \cap C) = A \cap (B - C).
$$
∎

---

### 6. $(A - B) \cup (A - C) = A - (B \cap C)$

**Proof.**  
For any $x$,
$$
x \in (A - B) \cup (A - C)
\iff (x \in A \land x \notin B) \lor (x \in A \land x \notin C)
$$
$$
\iff x \in A \land (x \notin B \lor x \notin C)
\iff x \in A \land \neg(x \in B \land x \in C)
$$
$$
\iff x \in A - (B \cap C).
$$
Thus equality. ∎

---

### 7. $(A - B) \cap (C - D) = (A \cap C) - (B \cup D)$

**Proof.**  
For any $x$,
$$
x \in (A - B) \cap (C - D)
\iff x \in A \land x \notin B \land x \in C \land x \notin D
$$
$$
\iff x \in A \cap C \land x \notin B \land x \notin D
\iff x \in A \cap C \land x \notin (B \cup D)
$$
$$
\iff x \in (A \cap C) - (B \cup D).
$$
Thus equality. ∎

---

### 8. $(A \cup B) - (A \cap B) = (A - B) \cup (B - A)$

**Proof.**  
For any $x$,
$$
x \in (A \cup B) - (A \cap B)
\iff x \in A \cup B \land x \notin A \cap B
$$
$$
\iff (x \in A \lor x \in B) \land (x \notin A \lor x \notin B)
$$
Distributing the conjunction over disjunction, the only possibilities are:
$$
(x \in A \land x \notin B) \lor (x \in B \land x \notin A),
$$
which is exactly $(A - B) \cup (B - A)$. ∎

---

### 9. $A \subseteq B \Rightarrow A - C \subseteq B - C$ and $A \cap C \subseteq B \cap C$

**Proof.**  
If $A \subseteq B$:

- For $A - C \subseteq B - C$:  
  Let $x \in A - C$. Then $x \in A$ and $x \notin C$.  
  Since $A \subseteq B$, $x \in B$. So $x \in B - C$.  

- For $A \cap C \subseteq B \cap C$:  
  Let $x \in A \cap C$. Then $x \in A$ and $x \in C$.  
  Since $A \subseteq B$, $x \in B$. Hence $x \in B \cap C$.  

Both inclusions follow directly. ∎

---

### 10. If $A \subseteq B$, then $B' \subseteq A'$

**Proof.**  
Suppose $A \subseteq B$. Let $x \in B'$. Then $x \notin B$.  
If $x \in A$, then by $A \subseteq B$ we would have $x \in B$, contradiction.  
Therefore $x \notin A$, so $x \in A'$. Hence $B' \subseteq A'$. ∎

---

# Final Remarks / Proof Strategies

- For subset proofs, use **element-chasing**: assume $x$ is in the left set, show it belongs to the right.  
- For equality, prove both directions.  
- Use De Morgan’s laws and double complement $(A')' = A$.  
- Translating set expressions to logic ($\land$, $\lor$, $\neg$) simplifies most derivations.  
- When stuck, sketch a Venn diagram before formalizing.

---
