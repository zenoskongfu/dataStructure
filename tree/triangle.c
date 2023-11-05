#include <stdio.h>

void printSquare(int width, int leftLine)
{
  // 还剩0行，结束打印
  if (leftLine <= 0)
    return;
  int startNumber = width;
  while (startNumber > 0)
  {
    printf("* ");
    startNumber--;
  }
  printf("\n");
  printSquare(width, leftLine - 1);
}

void printLine(int width, int lineNumber, int totalLine)
{
  // 还剩下0行，结束打印
  if (lineNumber > totalLine)
    return;
  // 需要打印几颗星
  int startNumber = lineNumber;
  // 需要打印几个空格
  int spaceLevel = width - startNumber;
  while (spaceLevel > 0)
  {
    printf(" ");
    spaceLevel--;
  }
  while (startNumber > 0)
  {
    printf("* ");
    startNumber--;
  }
  printf("\n");
  // 打印下一行
  printLine(width, lineNumber + 1, totalLine);
}

void printTriangle(int width)
{
  // 总共打印9行
  int totalLine = 9;
  printLine(width, 1, totalLine);
}

int main(int argc, char const *argv[])
{
  // 定义打印三角形的宽度
  int width = 10;
  // printTriangle(width);
  printSquare(10, 10);
  return 0;
}
