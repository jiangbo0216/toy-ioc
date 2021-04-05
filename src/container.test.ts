// 编译代码 npx tsc -b tsconfig.json

// container.test.ts
import { Container } from "./container";
import { Injectable } from "./injectable";
import { Inject } from "./inject";
import { InjectionToken } from "./provider";

// Token 是IOC容器所要创建对象的标识符
const API_URL = new InjectionToken("apiUrl");

console.log(API_URL)

@Injectable()
class HttpClient {}

@Injectable() // 用于表示此类可以自动注入其依赖项
class HttpService {
  constructor(
    private httpClient: HttpClient,
    // 参数装饰器
    @Inject(API_URL) private apiUrl: string
  ) {}
}

const container = new Container();

// Provider 用于描述如何创建这些对象
container.addProvider({
  provide: API_URL,
  useValue: "https://www.semlinker.com/",
});

container.addProvider({ provide: HttpClient, useClass: HttpClient });
container.addProvider({ provide: HttpService, useClass: HttpService });

// 根据 Token 获取与之对应的对象
const httpService = container.inject(HttpService);
const httpClient = container.inject(HttpClient);
console.log(httpService)

console.dir(httpService);
console.dir(httpClient);