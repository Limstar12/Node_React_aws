import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';


import axios from 'axios';

class Classcomponent extends Component {
    constructor(props){
        super(props)
        this.state ={
            message : '서비스요청을 기다리는 중...',
            interviewData : [],
            deleteDB : async (keyno) => {
                try{
               
                    axios.post('/api?type=interviewDelete', {
                        
                        body :{ 
                                no : keyno,
                                crud : 'delete',
                                mapper : this.props.dbinfo.mapper,
                                mapperid :'interviewDelete'
                         }
            
                    }).then( res => {                 
                        console.log(res.data) //데이터 콘솔에서 확인            
                        try{                  
                            this.setState({ message : '삭제되었습니다. '});
                        }
                        catch(err){
                            this.setState({ message : 'DB데이터타입검수바람 ' +  err});
                        }
            
                    }).catch( err => {
                        this.setState({ message : '접속하였으나 처리하지 못함 ' +  err});
                    })
                   }
                   catch(err){
                       this.setState({ message : '서버접속불가 ' +  err});
                   }  
        
            }
            
        }
        
    }
    componentDidMount = async () => {
        try{
       
        axios.post('/api?type='+this.props.dbinfo.botable, {
            headers :{ 'Content-Type' : 'application/json' },
            body : { ...this.props.dbinfo }

        }).then( res => { 
            
            console.log(res.data) //데이터 콘솔에서 확인
        
            try{
                this.setState({ interviewData : [...res.data] }) 
                // array는 대체되는 정보로 쓸수없기때문에 대입식불가
                // 기존의 [] 빈정렬과 res.data을 합하는 식임
                console.log(this.state.interviewData) //리액트 변수에 데이터옮겨짐 데이터타입이 정렬이므로 map으로 풀어버림
            }
            catch(err){
                this.setState({ message : 'DB데이터타입검수바람 ' +  err});
            }
        }).catch( err => {
            this.setState({ message : '접속하였으나 처리하지 못함 ' +  err});
        })
       }
       catch(err){
           this.setState({ message : '서버접속불가 ' +  err});
       } 
    }

    

    render() {
        return (
            <Accordion defaultActiveKey="0" flush className={ ' container  py-5'}  tag ='div' >
                <h2>{ this.state.interviewData.length > 0 ? this.props.dbinfo.titlenm + "("+ this.state.interviewData.length + ")" : this.state.message } </h2>
                    {
                        
                     this.state.interviewData.map(
                         (wr_b,i) =>
                         {
                             return (
                                <Accordion.Item eventKey={i.toString()} key={ wr_b.keyno } >

                                    <Accordion.Header>
                                   
                                        <strong className='row justify-content-between align-items-center w-100'>
                                            <span className='col-sm-9 mb-0'> { wr_b.wr_a }</span>
                                            <span className='btn interviewBtn col-sm-3  mb-0'>
                                                <Link to={'/interviewModify/'+ wr_b.keyno } className='modify btn btn-primary mx-1 '>M</Link> 
                                                <a href="#" onClick={ e=>{ this.state.deleteDB(wr_b.keyno) }}  className='delete btn btn-primary mx-1'>D</a>
                                            </span>                                            
                                        </strong>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                            { wr_b.wr_b }
                                    </Accordion.Body>
                                </Accordion.Item>
                             )
                         }
                     )
                    }
            </Accordion>            
        );
    }
}

export default Classcomponent;