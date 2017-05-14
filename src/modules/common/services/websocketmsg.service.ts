import {Emitter} from "./emitter.service";

/**
 * 负责web socket的信息发送和接受，作为一个单独独立的代理角色，利于维护，虽然有耗性能
 * 1：建议将服务器端SOCKET进行单独的部署，同时进行访问限制，比如只可以127.0.0.1进行访问
 * 2：采用PHP等后端进行将信息的发送给代理前进行判断和业务处理
 */
@Injectable()
export class WebSocketMsgService{
    private ws:any=null;
    private domain:string;
    private port:number;

    constructor(domain:string,port:number,linkDirectly:boolean=true){
        this.domain = domain;
        this.port = port;
        this.init();
    }

    public init(){
        let self = this;
        try {
            self.ws = new WebSocket('ws:' + self.domain + ':' + self.port);
        }catch (e){
            self.ws = null;
            console.log('web socket link to '+ self.domain + ':' + self.port + 'fail, error is '+ e.toString());
        }
        if(self.ws){
            self.ws.onopen = function(){
                console.log('web socket was connected');
            }

            self.ws.onmessage = function(e){
                Emitter.fire('web_socket_on_message', e.data);
            }

            self.ws.onclose = function(){
                console.log('web socket was closed');
                Emitter.fire('web_socket_on_close');
            }

            self.ws.onerror = function(){
                console.log('web socket occured error');
                Emitter.fire('web_socket_on_error');
            }
        }
    }

    public send(msg:string){
        let self = this;
        self.ws.send(msg);
    }

    /*
    注册方法可接受一个STRING类型的变量
     */
    public onMessage(callback:Function,object:any){
        Emitter.register('web_socket_on_message',callback,object);
    }

    public onClose(callback:Function,object:any){
        Emitter.register('web_socket_on_close',callback,object);
    }

    public onError(callback:Function,object:any){
        Emitter.register('web_socket_on_error',callback,object);
    }
}
