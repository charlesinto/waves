import React, { Component } from 'react';
import DropZone from "react-dropzone";
import { connect } from "react-redux";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/fontawesome-free-solid";
import Slide from "react-slick";

import { CircularProgress } from "@material-ui/core";

import * as actions from '../Actions';

class FileUpload extends Component {
    constructor(){
        super();
        this.state = {
            uploadedFiles:[],
            uploading: false
        }
    }
    onDrop(files){
        console.log(files);
        this.setState({
            uploading: true
        })
        const formdata = new FormData();
        const config = {
            header:{'content-type':'multipart/formdata'}
        }
        files.forEach((file, i) => {
            formdata.append(`filename[${i}]`, file)
        })
        this.props.uploadHandler(files, config, formdata); 
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            uploadedFiles:nextProps.images.length > 0 ? 
                                        [...this.state.uploadedFiles, ...nextProps.images] : [],
            uploading: false
        })
    }
    showUploadedImages(){
        console.log(this.state);
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            arrows: false
        }
        return this.state.uploadedFiles.length > 0 ?
                    <Slide {...settings}>
                        {
                             this.state.uploadedFiles.map((file, i) => (
                                <div className="" key={i}>
                                    <div className="dropzone_image"
                                        style={{
                                            background:`url(${file.url}) no-repeat`,
                                            backgroundSize:'contain',
                                            width: '200px',
                                            height: '200px',
                                            margin: '0 auto'
                                        }}
                                        
                                    >
                    
                                    </div>
                                 </div>
                             ))
                        }
                    </Slide>

                : null

    }
     generateSlides = () => (
        slides ?
            slides.map((item,i)=>(
                <div key={i}>
                    <div className=""
                        style={{
                            background:`url(${item.img})`,
                            height:`300px`
                        }}
                    >
                        
                    </div>
                </div>
            ))
        :null
    )
    render() {
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                        <DropZone
                            onDrop={(files) => this.onDrop(files)}
                            multiple
                             className="dropzone_box"
                        >
                            <div className="wrap">
                                <FontAwesomeIcon
                                    icon={faPlusCircle}
                                />
                            </div>
                        </DropZone>
                        
                        {
                            this.state.uploading ?
                            <div className="dropzone_box"
                                style={{
                                    textAlign: 'center',
                                    paddingTop: '20px',
                                    display:'flex',
                                    alignItems:'center'
                                }}
                            >
                                <CircularProgress 
                                    thickness={7}
                                    style={{color:'#00bcd4'}}
                                />
                            </div>
                            : null
                        }
                    </div>
                    {/* <div className="dropzone_wrapper">
                        <Slide {...settings}>
                            { this.generateSlides()}
                        </Slide>
                        </div> */}
                    <div>
                        
                        <div className="dropzone_wrapper">
                        <Slide {...settings}>
                            { this.showUploadedImages()}
                        </Slide>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
}

const slides = [
    {
        img:'/images/featured/featured_home.jpg',
        lineOne:'Fender',
        lineTwo:'Custom shop',
        linkTitle:'Shop now',
        linkTo:'/shop'
    },
    {
        img:'/images/featured/featured_home_2.jpg',
        lineOne:'B-Stock',
        lineTwo:'Awesome discounts',
        linkTitle:'View offers',
        linkTo:'/shop'
    }
]


const mapStateToProps = state => {
    const { isUploaded, images} = state.products;
    return {
        isUploaded,
        images
    }
}

export default connect(mapStateToProps, actions)(FileUpload);