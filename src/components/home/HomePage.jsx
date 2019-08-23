import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { CardColumns, Button } from 'react-bootstrap';

import { bindActionCreatorsExt } from '../../utils/utils.redux.bindActionCreatorsExt';
import homeActions from '../../redux/home/home.redux.initData';
import GnomeBar from '../shared/GnomeBar';
import GnomeCard from '../shared/cards/GnomeCard';
import GnomeDetailDialog from '../shared/modal/GnomeDetailDialog';

require('./home.style.scss');

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component{
  static propTypes = {
    population: PropTypes.array,
    professions: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    filteredPopulation: PropTypes.array,
    cardsToShow: PropTypes.number.isRequired,
    showDetailDialog: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    population: [],
    filteredPopulation: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      showDetailsModal: false,
    };

    this.handleSearchByProfessionClick = this.handleSearchByProfessionClick.bind(this);
    this.handleLoadMoreOnClick = this.handleLoadMoreOnClick.bind(this);
    this.handleShowAll = this.handleShowAll.bind(this);
    this.handleOrderByFriendlies = this.handleOrderByFriendlies.bind(this);
    this.handleOrderByWorkaholic = this.handleOrderByWorkaholic.bind(this);
    this.handleOnCloseDialog = this.handleOnCloseDialog.bind(this);
    this.handleOnDetailClick = this.handleOnDetailClick.bind(this);
  }

  componentDidMount() {
    this.props.actions.getMockData();
  }

  handleSearchByProfessionClick(profession){
    this.props.actions.filterByProfession(profession);
  }

  handleLoadMoreOnClick() {
    this.props.actions.loadMoreCards();
  }

  handleShowAll() {
    this.props.actions.orderByDefault();
  }

  handleOrderByFriendlies() {
    this.props.actions.orderByMoreFriendly();
  }

  handleOrderByWorkaholic() {
    this.props.actions.orderByMoreWorkaholic();
  }

  handleOnDetailClick(gnomeId){
    this.props.actions.showGnomeDetails(gnomeId);
  }

  handleOnCloseDialog() {
    this.props.actions.hideGnomeDetails();
  }

  render(){
    return(
      <div className="gnome-home">
        <GnomeBar
          professionList = {this.props.professions}
          onSearchClick ={this.handleSearchByProfessionClick}
          onShowAll = {this.handleShowAll}
          onOrderByFriendlies = {this.handleOrderByFriendlies}
          onOrderByWorkaholic = {this.handleOrderByWorkaholic}
        />
        <div className="container">
          <CardColumns className="container-gnome-cards">
            {this.props.population.slice(0, this.props.cardsToShow).map(gnome => <GnomeCard gnome={gnome} key={gnome.id} onDetailClick={this.handleOnDetailClick}/>)}
          </CardColumns>
          <Button variant="secondary" size="lg" block onClick={this.handleLoadMoreOnClick}>
            Load more
          </Button>
        </div>
        {this.props.showDetailDialog && 
          <GnomeDetailDialog
            gnome={this.props.selectedGnome}
            show={this.props.showDetailDialog}
            onCloseClick={this.handleOnCloseDialog}
          />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    population: state.appData.home.filteredPopulation,
    selectedGnome: state.appData.home.selectedGnome,
    cardsToShow: state.appData.home.cardsToShow,
    professions: state.appData.home.referenceData.professions,
    showDetailDialog: state.appData.home.showDetailDialog,
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    actions: bindActionCreatorsExt(
      {
        ...homeActions,
      }, dispatch),
  });
}
