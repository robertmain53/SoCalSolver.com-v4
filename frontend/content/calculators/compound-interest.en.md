---
title: Compound Interest Calculator
description: Calculate compound interest over time and understand the underlying math.
category: finance
tags:
- interest
- investment
- compounding
- time
difficulty: intermediate
audience: learners
author: Alex Thompson
reviewed_by: Dr. Emily Rodriguez
en:
  title: Compound Interest Calculator
  description: Easily calculate compound interest over time with flexible input options.
es:
  title: "Calculadora de Inter\xE9s Compuesto"
  description: "Calcule f\xE1cilmente el inter\xE9s compuesto a lo largo del tiempo."
fr:
  title: "Calculatrice d\u2019Int\xE9r\xEAt Compos\xE9"
  description: "Calculez facilement les int\xE9r\xEAts compos\xE9s dans le temps."
it:
  title: Calcolatore Interesse Composto
  description: "Calcola facilmente l\u2019interesse composto nel tempo."
zh:
  title: "\u590D\u5229\u8BA1\u7B97\u5668"
  description: "\u8F7B\u677E\u8BA1\u7B97\u590D\u5229\u968F\u65F6\u95F4\u7684\u589E\
    \u957F\u3002"
ko:
  title: "\uBCF5\uB9AC \uACC4\uC0B0\uAE30"
  description: "\uC2DC\uAC04\uC5D0 \uB530\uB978 \uBCF5\uB9AC\uB97C \uC27D\uAC8C \uACC4\
    \uC0B0\uD558\uC138\uC694."
---
<CalculatorCompoundInterest />

## 🧾 How It Works
:::explain
Compound interest is calculated by applying the interest rate to the accumulated amount over time, not just the principal. This creates exponential growth.

For example, if you invest $1000 at 5% annual interest compounded yearly for 10 years:
- After 1 year: 1000 × 1.05 = 1050
- After 2 years: 1050 × 1.05 = 1102.5
- ...
Use the formula: **A = P(1 + r/n)<sup>nt</sup>**
:::

## 🧠 Learn the Concept
:::learn
Compound interest is more than just finance — it models viral growth, population, and exponential decay.

The key concept is that the more frequently you compound (monthly vs yearly), the greater the total growth. This is why credit card debt can snowball, and why early investing pays off.

Historically, this formula was used by merchants as far back as Babylon. Today, it's critical in finance, economics, and even biology.
:::

## 🎓 Try a Challenge
:::challenge
**Question:** What happens if interest is compounded weekly instead of yearly?  
**Answer:** Adjust the formula’s `n` to 52 instead of 1. The result is a slightly higher final value — an effect that grows the longer the time period.
:::

<CalculatorAuthorLink :author="frontmatter.author" />
<CalculatorReviewer :reviewer="frontmatter.reviewed_by" />
