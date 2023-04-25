import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../features/auth/authSlice';
import {
    fetchCompanies,
    updateCompanyById,
    deleteCompanyById,
    createCompany,
    fetchCompanyById,
} from '../features/companies/companiesSlice';
import {
    createProduct,
    deleteProductById,
    fetchProductById,
    fetchProducts,
    updateProductById,
} from '../features/products/productsSlice';
import {
    createWorker,
    deleteWorkerById,
    fetchWorkerById,
    fetchWorkers,
    updateWorkerById,
} from '../features/workers/workersSlice';
import {
    createService,
    deleteServiceById,
    fetchServiceById,
    fetchServices,
    updateServiceById,
} from '../features/services/ServicesSlice';
import {
    createNews,
    deleteNewsById,
    fetchNews,
    fetchNewsById,
    updateNewsById,
    updateStatusNews,
} from '../features/news/newsSlice';
import {
    createStatistics,
    deleteStatisticsById,
    fetchStatistics,
    fetchStatisticsById,
    updateStatisticsById,
} from '../features/statistics/statisticsSlice';
import {
    createType,
    deleteTypeById,
    fetchTypeById,
    fetchTypes,
    updateTypeById,
} from '../features/types/typesSlice';

import {
    createAbout,
    deleteAboutById,
    fetchAbout,
    fetchAboutById,
    updateAboutById,
} from '../features/about/aboutSlice';

const actions = {
    login,
    fetchCompanies,
    updateCompanyById,
    deleteCompanyById,
    createCompany,
    fetchCompanyById,
    createProduct,
    deleteProductById,
    fetchProductById,
    fetchProducts,
    updateProductById,
    createWorker,
    deleteWorkerById,
    fetchWorkerById,
    fetchWorkers,
    updateWorkerById,
    createService,
    deleteServiceById,
    fetchServiceById,
    fetchServices,
    updateServiceById,
    createNews,
    deleteNewsById,
    fetchNews,
    fetchNewsById,
    updateNewsById,
    updateStatusNews,
    createStatistics,
    deleteStatisticsById,
    fetchStatistics,
    fetchStatisticsById,
    updateStatisticsById,
    createType,
    deleteTypeById,
    fetchTypeById,
    fetchTypes,
    updateTypeById,
    createAbout,
    deleteAboutById,
    fetchAbout,
    fetchAboutById,
    updateAboutById,
};

const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, [dispatch]);
};

export default useActions;
