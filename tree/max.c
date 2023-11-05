#include <stdio.h>
// 宏定义
// #define max(a, b) (((a) > (b)) ? (a) : (b))

// max 是一个函数
int max(int a, int b)
{
  if (a > b)
    return a;
  else
    return b;
}

int main(int argc, char const *argv[])
{
  // int c = max(5, 3);
  int a, b;
  scanf("%d%d", &a, &b);
  // scanf("%d", &b);
  // max2 是一个变量
  int max2 = a > b ? a : b;

  printf("the max value is %d\n", max2);
  printf("hello world\n");
  return 0;
}
