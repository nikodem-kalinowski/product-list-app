import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { getProduct, updateProduct } from '../state/productList';


class ProductDetails extends React.Component {

  state = {
    readMode: true,
    imgLoading: true,
    name: '',
    number: '',
    description: '',
    images: [],
    changed: false
  }

  handleSubmit = event => {
    event.preventDefault()

    const name = this.state.name || this.props.details.name
    const number = this.state.number || this.props.details.number
    const description = this.state.description || this.props.details.description
    const index = this.props.match.params.id

    this.toggleEditMode()
    this.props.updateProduct(name, number, description, index)
    this.setStateDefault()
  }

  setStateDefault = () => {
    this.setState({
      name: '',
      number: '',
      description: '',
      changed: false
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      changed: true
    })
  }

  handleCancel = () => {
    this.setState({
      readMode: true,
      changed: false,
      name: this.props.details.name,
      number: this.props.details.number,
      description: this.props.details.description,
    })
  }

  handleImageLoad = () => {
    this.setState({
      imgLoading: false
    })
  }

  toggleEditMode = () => {
    this.setState({
      readMode: !this.state.readMode
    })
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  render() {

    const images = this.props.details.images || this.state.images
    const name = this.state.changed && this.state.name ? this.state.name : this.props.details.name
    const number = this.state.changed && this.state.number ? this.state.number : this.props.details.number
    const description = this.state.changed && this.state.description ? this.state.description : this.props.details.description

    return (
      <div>
        <Button>
          <Link to='/'>
            BACK
          </Link>
        </Button>
        <Form
          onSubmit={this.handleSubmit}
          id="form"
        >
          <FormGroup>
            <Label for="name">
              Name:
            </Label>
            <Input
              type="text"
              readOnly={this.state.readMode}
              value={name}
              style={{border: '0px', width: '100%'}}
              id="name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="number">
              Number:
            </Label>
            <Input
              type="text"
              readOnly={this.state.readMode}
              value={number}
              style={{border: '0px', width: '100%'}}
              id="number"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="desc">
              Description:
            </Label>
            <Input
              type="textarea"
              readOnly={this.state.readMode}
              value={description}
              style={{border: '0px', width: '100%'}}
              id="description"
              onChange={this.handleChange}
            />
          </FormGroup>
          {
            this.state.readMode ?
              <Button
                onClick={this.toggleEditMode}
              >
                Update
              </Button> :
              <div>
                <Button
                  type='submit'
                >
                  Save
                </Button>
                < Button
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
              </div>
          }
        </Form>
        {
          images.length > 0 ?
            images.map(
              (img, idx) =>
                <a
                  key={idx}
                  href="https://bluestonepim.com"
                >
                  <img
                    onLoad={this.handleImageLoad}
                    src={`${img.url}`}
                    alt="Product"
                  />
                  {
                    this.state.imgLoading && <p>Getting images...</p>
                  }
                </a>
            ) :
            <p>No picture available</p>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.productList.data,
  index: state.productList.index,
  details: state.productList.details
})

const mapDispatchToProps = dispatch => ({
  getProduct: (index) => dispatch(getProduct(index)),
  updateProduct: (name, number, description, index) => dispatch(updateProduct(name, number, description, index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails)