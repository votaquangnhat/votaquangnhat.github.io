# 🧩 Set Theory & Logic Practice Ladder

A gradual set of exercises to build your proof intuition — from definitions to multi-step reasoning.

---

## **LEVEL 0 — Understanding the Language of Sets**

### **A. Vocabulary Warm-Up**
Write what each means in words.

1. \( x \in A \cap B \)  
2. \( x \in A \cup B \)  
3. \( x \in A - B \)  
4. \( x \in A' \)  
5. \( A \subseteq B \)  
6. \( A = B \)  
7. \( A \nsubseteq B \)  
8. \( \emptyset \subseteq A \)  
9. \( U \) (universal set)  
10. \( A \times B \)

---

### **B. Translate Between Logic and Sets**
Write each statement in logical form (using “and”, “or”, “not”, “implies”) and vice versa.

1. \( x \in A \cap B \) ⟺ \( (x \in A) \land (x \in B) \)  
2. \( x \in A \cup B \) ⟺ \( (x \in A) \lor (x \in B) \)  
3. \( x \in A - B \) ⟺ \( (x \in A) \land \neg(x \in B) \)  
4. \( x \in A' \) ⟺ \( \neg(x \in A) \)  
5. \( A \subseteq B \) ⟺ \( \forall x,\ (x \in A \Rightarrow x \in B) \)  
6. \( A = B \) ⟺ \( (A \subseteq B) \land (B \subseteq A) \)  
7. If \( A \subseteq B \) and \( B \subseteq C \), what follows about \( A \) and \( C \)?  
8. If \( A \subseteq B' \), what can you say about \( A \cap B \)?  
9. If \( x \notin A \cup B \), where can \( x \) be?  
10. If \( x \in (A \cap B)' \), write the equivalent condition using “or”.

---

### **C. Concept Check**
Answer in words or with examples.

1. Give an example of two sets \(A, B\) such that \(A \subseteq B\) but \(A \neq B\).  
2. Can a set be a subset of itself?  
3. What is the complement of the empty set?  
4. What is \( A - A \)?  
5. What is \( A \cap \emptyset \)?  
6. What is \( A \cup U \)?  
7. If \( A \subseteq B \), what happens to their complements?  
8. How can you visualize \( A - B \) on a Venn diagram?  
9. Can \( A \cap B = \emptyset \) but \( A \cup B \neq \emptyset \)? Give an example.  
10. What is the difference between \( \subseteq \) and \( \subset \)?

---

## **LEVEL 1 — Foundations: Unions, Intersections, Complements**

Prove or disprove each statement.

1. \( A \cap B \subseteq A \)  
2. \( A \subseteq A \cup B \)  
3. \( A \subseteq A \)  
4. \( A \cup \emptyset = A \)  
5. \( A \cap U = A \)  
6. \( (A')' = A \)  
7. \( (A \cup B)' = A' \cap B' \)  
8. \( (A \cap B)' = A' \cup B' \)  
9. \( A \cup (B \cap C) \subseteq (A \cup B) \cap (A \cup C) \)  
10. \( (A \cap B) \cup (A \cap C) \subseteq A \cap (B \cup C) \)

---

## **LEVEL 2 — Moderate: Distributing, Simplifying, Relating**

1. \( A \cap (B \cup C) = (A \cap B) \cup (A \cap C) \)  
2. \( A \cup (B \cap C) = (A \cup B) \cap (A \cup C) \)  
3. If \( A \subseteq B \), prove \( A \cap C \subseteq B \cap C \).  
4. If \( A \subseteq B \), prove \( A - C \subseteq B - C \).  
5. \( A - (B \cup C) = (A - B) \cap (A - C) \)  
6. \( A - (B \cap C) = (A - B) \cup (A - C) \)  
7. \( (A \cup B) - C = (A - C) \cup (B - C) \)  
8. \( (A \cap B) - C = (A - C) \cap (B - C) \)  
9. Prove or disprove \( A \subseteq (A \cup B) \cap (A \cup B') \).  
10. Simplify \( (A' \cup B')' \).

---

## **LEVEL 3 — Advanced: Chaining Relations**

1. \( A \cap (B - C) = (A \cap B) - C \)  
2. \( (A - B) \cap C = (A \cap C) - B \)  
3. \( A - (B - C) = (A - B) \cup (A \cap C) \)  
4. \( (A \cap B) - (A \cap C) \subseteq A \cap (B - C) \)  
5. \( A \cap (B - C) \subseteq (A \cap B) - (A \cap C) \)  
6. \( (A - B) \cup (A - C) = A - (B \cap C) \)  
7. \( (A - B) \cap (C - D) = (A \cap C) - (B \cup D) \)  
8. \( (A \cup B) - (A \cap B) = (A - B) \cup (B - A) \)  
9. \( A \subseteq B \Rightarrow A - C \subseteq B - C \Rightarrow A \cap C \subseteq B \cap C \).  
10. If \( A \subseteq B \), then \( B' \subseteq A' \).

---

**Tip:**  
- For each equality, prove both directions.  
- For each subset, show element-wise inclusion.  
- Draw Venn diagrams when stuck; they help your intuition before formalizing.

---
