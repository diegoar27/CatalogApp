/* global _ */

import homeApi from '../../apis/apis.home';

const getMockData = {
  type: 'getMockData',
  action() {
    return dispatch => (
      homeApi.getDataFromUrl('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
        .then(data =>
          dispatch({
            type: getMockData.type,
            data: data.Brastlewark,
          })
        )
    );
  },
  create() {
    return (dispatch) => {
      dispatch(getMockData.action());
    };
  },
  get reducer() {
    return (state, { data: population }) => {
      
      function onlyUnique(value, index, self) { 
          return self.indexOf(value) === index;
      }

      const gnomePopulation = population.map(gnome => ({
        id: gnome.id,
        name: gnome.name,
        thumbnail: gnome.thumbnail,
        age: gnome.age,
        weight: gnome.weight,
        height: gnome.height,
        hairColor: gnome.hair_color,
        professions: gnome.professions,
        friends: gnome.friends,
      }));

      let gnomeProfessions = [];
      gnomePopulation.forEach(gnome => {
        gnomeProfessions = [ ...gnomeProfessions, ...gnome.professions];
      });
            
      return {
        ...state,
        home: { 
          ...state.home,
          filteredPopulation: gnomePopulation,
          referenceData: {
            ...state.home.referenceData,
            population: gnomePopulation,
            professions: gnomeProfessions.filter(onlyUnique).sort(),
          },
        }
      };
    };
  },
};

const filterByProfession = {
  type: 'filterByProfession',
  action(profession) {
    return dispatch => (
        dispatch({
          type: filterByProfession.type,
          data: profession
        })
    );
  },
  create(profession) {
    return (dispatch) => {
      dispatch(filterByProfession.action(profession));
    };
  },
  get reducer() {
    return (state, { data: profession }) => {
      
      const gnomePopulation = 
        state.home.referenceData.population.filter(gnome => gnome.professions.some(x => x.trim() === profession.trim()));
            
      return {
        ...state,
        home: { 
          ...state.home,
          filteredPopulation: gnomePopulation,
          cardsToShow: state.home.referenceData.cardsChuncks,
        }
      };
    };
  },
};

const loadMoreCards = {
  type: 'loadMoreCards',
  action() {
    return dispatch => (
        dispatch({
          type: loadMoreCards.type,
        })
    );
  },
  create() {
    return (dispatch) => {
      dispatch(loadMoreCards.action());
    };
  },
  get reducer() {
    return (state) => {
                        
      return {
        ...state,
        home: { 
          ...state.home,
          cardsToShow: (state.home.cardsToShow + state.home.referenceData.cardsChuncks),
        }
      };
    };
  },
};

const orderByDefault = {
  type: 'orderByDefault',
  action() {
    return dispatch => (
        dispatch({
          type: orderByDefault.type,
        })
    );
  },
  create() {
    return (dispatch) => {
      dispatch(orderByDefault.action());
    };
  },
  get reducer() {
    return (state) => {
                        
      return {
        ...state,
        home: { 
          ...state.home,
          filteredPopulation: state.home.referenceData.population.slice(0),
          cardsToShow: state.home.referenceData.cardsChuncks,
        }
      };
    };
  },
}

const orderByMoreFriendly = {
  type: 'orderByMoreFriendly',
  action() {
    return dispatch => (
        dispatch({
          type: orderByMoreFriendly.type,
        })
    );
  },
  create() {
    return (dispatch) => {
      dispatch(orderByMoreFriendly.action());
    };
  },
  get reducer() {
    return (state) => {
                        
      return {
        ...state,
        home: { 
          ...state.home,
          filteredPopulation: state.home.filteredPopulation.slice(0).sort((x, y) => y.friends.length - x.friends.length),
          cardsToShow: state.home.referenceData.cardsChuncks,
        }
      };
    };
  },
}

const orderByMoreWorkaholic = {
  type: 'orderByMoreWorkaholic',
  action() {
    return dispatch => (
        dispatch({
          type: orderByMoreWorkaholic.type,
        })
    );
  },
  create() {
    return (dispatch) => {
      dispatch(orderByMoreWorkaholic.action());
    };
  },
  get reducer() {
    return (state) => {
                        
      return {
        ...state,
        home: { 
          ...state.home,
          filteredPopulation: state.home.filteredPopulation.slice(0).sort((x, y) => y.professions.length - x.professions.length),
          cardsToShow: state.home.referenceData.cardsChuncks,
        }
      };
    };
  },
}

const showGnomeDetails = {
  type: 'showGnomeDetails',
  action(gnomeId) {
    return dispatch => (
        dispatch({
          type: showGnomeDetails.type,
          data: gnomeId
        })
    );
  },
  create(gnomeId) {
    return (dispatch) => {
      dispatch(showGnomeDetails.action(gnomeId));
    };
  },
  get reducer() {
    return (state, { data: gnomeId }) => {
                        
      return {
        ...state,
        home: { 
          ...state.home,
          showDetailDialog: true,
          selectedGnome: state.home.referenceData.population.find(x => x.id === gnomeId),
        }
      };
    };
  },
}

const hideGnomeDetails = {
  type: 'hideGnomeDetails',
  action() {
    return dispatch => (
        dispatch({
          type: hideGnomeDetails.type,
        })
    );
  },
  create() {
    return (dispatch) => {
      dispatch(hideGnomeDetails.action());
    };
  },
  get reducer() {
    return (state) => {
                        
      return {
        ...state,
        home: { 
          ...state.home,
          showDetailDialog: false,
          selectedGnome: undefined,
        }
      };
    };
  },
}

const actions = {
  getMockData,
  filterByProfession,
  loadMoreCards,
  orderByDefault,
  orderByMoreFriendly,
  orderByMoreWorkaholic,
  showGnomeDetails,
  hideGnomeDetails,
};

export default actions;
