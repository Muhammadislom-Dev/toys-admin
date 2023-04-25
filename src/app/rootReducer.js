import { combineReducers } from 'redux';
import { authReducer } from '../features/auth/authSlice';
import { productReducer } from '../features/products/productsSlice';
import { companyReducer } from '../features/companies/companiesSlice';
import { workersReducer } from '../features/workers/workersSlice';
import { servicesReducer } from '../features/services/ServicesSlice';
import { newsReducer } from '../features/news/newsSlice';
import { statisticsReducer } from '../features/statistics/statisticsSlice';
import { typeReducer } from '../features/types/typesSlice';
import { aboutReducer } from '../features/about/aboutSlice';

export const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    companies: companyReducer,
    workers: workersReducer,
    services: servicesReducer,
    news: newsReducer,
    statistics: statisticsReducer,
    types: typeReducer,
    about: aboutReducer,
});
