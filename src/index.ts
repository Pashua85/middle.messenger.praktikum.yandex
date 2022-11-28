import './styles';

const test: Record<string, number> = {
  some: 3,
};

class Test {
  public someId = 3;
  protected without = 'ef';
  private some = 'test';

  constructor(private test: number) {}
}
