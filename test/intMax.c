#include <stdio.h>
#include <stdlib.h>

void printf_bin(int num)
{
  int i, j, k;
  unsigned char *p = (unsigned char *)&num + 3;

  for (i = 0; i < 4; i++) // 处理4个字节(32位）
  {
    j = *(p - i);                // 取每个字节的首地址
    for (int k = 7; k >= 0; k--) // 处理每个字节的8个位
    {
      if (j & (1 << k))
        printf("1");
      else
        printf("0");
    }
    printf(" ");
  }
  printf("\r\n");
}

void printf_bin_8(unsigned char num)
{
  int k;
  unsigned char *p = (unsigned char *)&num;

  for (int k = 7; k >= 0; k--) // 处理8个位
  {
    if (*p & (1 << k))
      printf("1");
    else
      printf("0");
  }
  printf("\r\n");
}

int main(int argc, char const *argv[])
{
  // 0111 1111 1111 1111 1111 1111 1111 1111
  int a = 2147483647;
  // 0000 0000 0000 0000 0000 0000 0000 0001
  int b = 1;
  // 1000 0000 0000 0000 0000 0000 0000 0000
  int c = a + b;
  // char *ac = &a;
  printf("a: %d, b: %d, a+b: %d\n", a, b, c);
  printf("a: %x, b: %x, a+b: %x\n", a, b, c);
  printf("\n");

  printf_bin(a);
  printf_bin(b);
  printf_bin(c);
  return 0;
}
